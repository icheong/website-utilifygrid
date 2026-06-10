# PDF Tool Implementation Guide

This document covers the shared architecture and per-tool specifics for the three PDF editor tools: **pdf-edit.astro**, **pdf-sign.astro**, and **pdf-enhance.astro**.

---

## Table of Contents

1. [Libraries & Runtime](#1-libraries--runtime)
2. [Page Rendering Pipeline](#2-page-rendering-pipeline)
3. [SVG Overlay & Element Rendering](#3-svg-overlay--element-rendering)
4. [Control Bar Layout](#4-control-bar-layout)
5. [Paging](#5-paging)
6. [Expand / Collapse Fullscreen](#6-expand--collapse-fullscreen)
7. [Undo / Redo (Per-Page History)](#7-undo--redo-per-page-history)
8. [Clear Button](#8-clear-button)
9. [Save / Export](#9-save--export)
10. [Drag to Move (Reposition)](#10-drag-to-move-reposition)
11. [Drag to Resize](#11-drag-to-resize)
12. [Coordinate Systems & Conversion](#12-coordinate-systems--conversion)
13. [Cross-Page Sync (pdf-enhance only)](#13-cross-page-sync-pdf-enhance-only)
14. [Key Differences Between Tools](#14-key-differences-between-tools)

---

## 1. Libraries & Runtime

All three tools run entirely client-side with no server dependency:

| Library | Purpose |
|---|---|
| **pdfjs-dist** (v3.11.174) | Renders PDF pages to `<canvas>` for visual display. Provides viewport scaling and page metadata. |
| **pdf-lib** (v1.17.1) | Modifies PDF bytes directly — draws text, shapes, images; sets media/crop boxes. Used only in the Save handler. |

Both are loaded via CDN `<script>` tags in the page `<head>` and accessed as `window.pdfjsLib` and `window.PDFLib`.

---

## 2. Page Rendering Pipeline

Every tool follows the same rendering pipeline:

1. **User drops/selects a PDF** → `loadFile(file)` stores `pdfBytes` and creates a `pdfjsLib.getDocument()` document.
2. **`renderPage(pageNum)`** is called:
   - Gets the pdfjs page: `pdfDoc.getPage(num)`.
   - Creates a viewport at `baseScale` (computed from container width / page width, capped at 2).
   - Sets `<canvas>` dimensions and draws the page: `page.render({ canvasContext: ctx, viewport: vp })`.
   - Sets `<svg>` viewBox and dimensions to match the canvas (1:1 pixel mapping).
   - Loads the same page via **pdf-lib** to get `pdfPageW` / `pdfPageH` (PDF point dimensions).
   - Calls the tool-specific element render function (`renderEdits()`, `renderAll()`, or `renderElements()`).
3. **Navigation buttons** call `renderPage()` with the new page number.

### Per-page state storage

All tools store elements in a `Record<number, Element[]>` keyed by 1-based page number:

- **pdf-edit**: `pageEdits` — edits include text, shapes, images, freehand, highlights, underlines, comments.
- **pdf-sign**: `pageSignatures` (placed signatures) and `pageDates` (date stamps).
- **pdf-enhance**: `pageElements` — elements include watermark-text, watermark-image, header, footer, bates.

---

## 3. SVG Overlay & Element Rendering

Each tool renders an absolutely-positioned `<svg>` on top of the `<canvas>`. The SVG serves as both the visual overlay for placed elements and the interaction surface for drag/resize.

### SVG structure (per element)

Every placed element is wrapped in a `<g>` group with metadata attributes:

```html
<g data-type="edit" data-idx="N">   <!-- or "sig", "date", "elem" -->
  <!-- 1. Invisible hit area -->
  <rect x="..." y="..." width="..." height="..." fill="transparent" stroke="none" style="cursor:grab" />

  <!-- 2. Visual element (type-specific) -->
  <text> / <rect> / <ellipse> / <line> / <image> / <polyline> / etc.
  <!-- All have pointer-events:none so clicks pass through to hit area -->

  <!-- 3. Selection border (optional, dashed) -->
  <rect ... fill="none" stroke="#1D4ED8" stroke-dasharray="4 2" pointer-events="none" />

  <!-- 4. Resize handle -->
  <rect x="..." y="..." width="8-12" height="8-12" rx="2" fill="#1D4ED8" stroke="#fff"
        data-action="resize-N" style="cursor:nwse-resize" />
</g>
```

### Coordinate conversion in rendering

Elements are stored in PDF point coordinates. The rendering function converts to viewport pixels inline:

**pdf-edit / pdf-sign (viewport-based):**
```
sx = pageViewportW / pagePdfW
sy = pageViewportH / pagePdfH
tx(px) = px * sx
ty(py) = (pagePdfH - py) * sy    // Y-axis flip
```

**pdf-enhance (bounding-box based):**
```
vx = el.x * (vpW / pdfPageW)
vy = (pdfPageH - el.y - el.h) * (vpH / pdfPageH)
vw = el.w * (vpW / pdfPageW)
vh = el.h * (vpH / pdfPageH)
```

---

## 4. Control Bar Layout

All three tools use a consistent bottom bar layout:

```html
<div style="display:flex; align-items:center; justify-content:space-between; ...">
  <!-- Left group: page navigation -->
  <div style="display:flex; align-items:center; gap:0.5rem;">
    <button id="prev-page">← Prev</button>
    <span>Page <span id="page-num">1</span> / <span id="page-total">1</span></span>
    <button id="next-page">Next →</button>
  </div>

  <!-- Right group: actions -->
  <div style="display:flex; align-items:center; gap:0.4rem;">
    <button id="undo-btn" disabled>Undo</button>
    <button id="redo-btn" disabled>Redo</button>
    <button id="clear-page-btn" style="color:#EF4444;">Clear</button>
    <div style="width:1px; height:1.5rem; background:var(--border);"></div>  <!-- divider -->
    <button id="save-btn" class="btn-primary">Save PDF</button>
  </div>
</div>
```

### Per-tool variations

| Tool | Left group | Right group | Extra |
|---|---|---|---|
| **pdf-edit** | Prev / Page / Next | Undo / Redo / **Clear** / divider / Save | Edit count badge, tool toggles, properties panel in top bar |
| **pdf-sign** | Prev / Page / Next | Sig count / **Clear** / Save | No undo/redo; signature modal in sidebar |
| **pdf-enhance** | Prev / Page / Next | Undo / Redo / **Clear** / divider / Save | Element count badge, tab toggles in top bar |

---

## 5. Paging

### State variables

```typescript
let currentPage: number = 1;
let totalPages: number = 0;
```

### Navigation handlers

```javascript
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) { currentPage--; renderPage(currentPage); updateNav(); }
});
nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) { currentPage++; renderPage(currentPage); updateNav(); }
});
```

### `updateNav()` function

Sets the page number text, toggles `disabled` on prev/next buttons, and updates tool-specific state (undo/redo buttons in pdf-edit/pdf-enhance, sig count in pdf-sign).

---

## 6. Expand / Collapse Fullscreen

Implemented in **pdf-edit** and **pdf-enhance** (not in pdf-sign).

### HTML structure

```html
<!-- Inline in the editor wrapper -->
<button id="expand-btn">Expand</button>

<!-- Fixed overlay (hidden by default) -->
<div id="editor-fullscreen" style="display:none; position:fixed; inset:0; z-index:999;
     background:var(--bg-surface); flex-direction:column; padding:0.75rem;">
  <div style="display:flex; align-items:center; justify-content:space-between; ...">
    <h3>Tool Name — Fullscreen</h3>
    <button id="collapse-btn">Collapse</button>
  </div>
  <div id="fs-editor-content" style="flex:1; display:flex; flex-direction:column; min-height:0;">
    <!-- editorWrap is moved here dynamically -->
  </div>
</div>
```

### `expandEditor()` flow

1. Save `editorWrap.parentNode` and `editorWrap.nextSibling` for later restoration.
2. Move `editorWrap` into `#fs-editor-content` via `appendChild`.
3. Set `editorWrap.style.cssText` to flex column layout.
4. Show the fullscreen overlay: `editorFullscreen.style.display = 'flex'`.
5. Hide body scroll: `document.body.style.overflow = 'hidden'`.
6. Force canvas to fill available space: `canvasContainer.style.cssText = 'width:100%; height:auto; flex:1; ...'`.
7. Re-render the page at the new dimensions.

### `collapseEditor()` flow

1. Re-insert `editorWrap` at its saved position using `insertBefore` (or `appendChild` as fallback).
2. Restore inline styles to defaults.
3. Hide the fullscreen overlay.
4. Restore `document.body.style.overflow`.
5. Force a reflow: `void canvasContainer.offsetWidth`.
6. Re-render the page.

### Escape key

```javascript
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isFullscreen) collapseEditor();
});
```

---

## 7. Undo / Redo (Per-Page History)

Implemented in **pdf-edit** and **pdf-enhance** (not in pdf-sign).

### Data structures

```typescript
let history: Record<number, Edit[][]> = {};      // page → array of snapshots
let historyIdx: Record<number, number> = {};      // page → current position in history
```

### `pushHistory(page)`

Takes a snapshot of the current page's elements and appends it to the history array, trimming any redo states:

```javascript
function pushHistory(page) {
  if (!history[page]) history[page] = [];
  const snap = (pageEdits[page] || []).map(e => ({ ...e }));  // shallow clone
  history[page] = history[page].slice(0, (historyIdx[page] ?? -1) + 1);
  history[page].push(snap);
  historyIdx[page] = history[page].length - 1;
}
```

### `undo()` / `redo()`

```javascript
function undo() {
  const h = history[currentPage] || [];
  const i = historyIdx[currentPage] ?? -1;
  if (i <= 0) return;
  historyIdx[currentPage] = i - 1;
  pageEdits[currentPage] = h[i - 1].map(e => ({ ...e }));  // restore snapshot
  renderEdits(); updateUndoRedoBtns();
}
// redo is the mirror: i + 1, restore forward
```

### Keyboard shortcuts

```javascript
document.addEventListener('keydown', e => {
  const mod = e.ctrlKey || e.metaKey;
  if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
  if (mod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
});
```

---

## 8. Clear Button

All three tools have a Clear button with id `clear-page-btn`, styled in red (`color:#EF4444`).

### pdf-edit & pdf-enhance (with history)

```javascript
clearPageBtn.addEventListener('click', () => {
  if (!pageEdits[currentPage]?.length) return;
  pushHistory(currentPage);          // preserve undo state
  pageEdits[currentPage] = [];
  renderEdits();
  updateEditCount();                 // or updateElemCount()
  showStatus('Page cleared', true);
});
```

### pdf-sign (no history)

```javascript
clearPageBtn.addEventListener('click', () => {
  const hasSigs = (pageSignatures[currentPage] || []).length > 0;
  const hasDates = (pageDates[currentPage] || []).length > 0;
  if (!hasSigs && !hasDates) return;
  pageSignatures[currentPage] = [];
  pageDates[currentPage] = [];
  renderAll();
  updateCounts();
  showStatus('Page cleared', true);
});
```

---

## 9. Save / Export

All tools use **pdf-lib** to bake edits into the PDF and trigger a download.

### General pattern

```javascript
saveBtn.addEventListener('click', async () => {
  saveBtn.disabled = true; saveBtn.textContent = 'Saving…';
  showStatus('Preparing PDF…', true);
  try {
    const libDoc = await PDFDocument.load(pdfBytes!);
    const helvetica = await libDoc.embedFont(StandardFonts.Helvetica);

    for (let p = 1; p <= totalPages; p++) {
      const edits = pageEdits[p] || [];
      if (!edits.length) continue;
      const page = libDoc.getPage(p - 1);
      for (const edit of edits) {
        // Draw each edit type using pdf-lib API
      }
    }

    const out = await libDoc.save();
    const blob = new Blob([out], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'output.pdf'; a.click();
    URL.revokeObjectURL(url);
    showStatus('Done!', false);
  } catch (err) { showStatus('Error: ' + err.message, false); }
  finally { saveBtn.disabled = false; saveBtn.textContent = 'Save PDF'; }
});
```

### Per-tool draw operations

| Tool | Draw calls |
|---|---|
| **pdf-edit** | `drawText`, `drawRectangle`, `drawEllipse`, `drawLine`, `drawImage`, `drawPolygon` (arrows), `drawPolyline` (freehand) |
| **pdf-sign** | `drawImage` (signatures), `drawText` (dates) — applies viewport-to-PDF scale factors (`sx`, `sy`) |
| **pdf-enhance** | `drawText` (watermarks, headers, footers, bates), `drawImage` (watermark images), `setMediaBox` + `setCropBox` (crop) |

### pdf-enhance unique behavior

After saving, pdf-enhance updates `pdfBytes` with the modified PDF, recreates the pdfjs document, clears all elements and history, and re-renders — so the user continues editing the modified PDF rather than the original.

---

## 10. Drag to Move (Reposition)

### State variables

```typescript
let dragIdx: number | null = null;    // index of element being dragged
let dragOffX: number = 0;             // X offset from mouse to element origin
let dragOffY: number = 0;             // Y offset from mouse to element origin
```

### mousedown — start drag

1. Find the clicked element via `target.closest('[data-type="edit"]')` (or `"sig"`, `"date"`, `"elem"`).
2. Extract the element index from `data-idx`.
3. Convert mouse position to PDF coordinates: `const mp = vpToPdf(pt.x, pt.y)`.
4. Compute offset from mouse to element origin:
   - **pdf-edit / pdf-enhance**: `dragOffX = mp.x - edit.x`, `dragOffY = -(mp.y - edit.y)` (Y inverted because PDF Y goes up).
   - **pdf-sign**: `dragOffX = pt.x - sig.x`, `dragOffY = pt.y - sig.y` (viewport coords, no inversion needed).
5. Set `dragIdx = idx` to activate the drag.

### mousemove — update position

```javascript
// pdf-edit / pdf-enhance (PDF coords)
const mp = vpToPdf(pt.x, pt.y);
const newPdfX = mp.x - dragOffX;
const newPdfY = mp.y + dragOffY;
const dpx = newPdfX - edit.x;
const dpy = newPdfY - edit.y;
edit.x += dpx;  edit.y += dpy;
if (edit.x2 !== undefined) { edit.x2 += dpx; edit.y2 += dpy; }  // shapes with two points
if (edit.points) { for (const p of edit.points) { p.x += dpx; p.y += dpy; } }  // freehand
renderEdits();
```

```javascript
// pdf-sign (viewport coords)
sig.x = pt.x - dragOffX;
sig.y = pt.y - dragOffY;
renderAll();
```

### mouseup — end drag

```javascript
pushHistory(currentPage);  // pdf-edit & pdf-enhance only
dragIdx = null;
```

Also bound on `document mouseup` and `svg mouseleave` as safety nets.

---

## 11. Drag to Resize

### State variables

```typescript
let resizing: boolean = false;
let resizeIdx: number | null = null;
let resizeStartX: number, resizeStartY: number;  // mouse start position
let resizeOrigBB: { x: number; y: number; w: number; h: number };  // original bounding box
let resizeStartX2: number, resizeStartY2: number;  // for shapes with x2/y2
```

### mousedown — detect resize handle

```javascript
const action = target.getAttribute('data-action') || '';
if (action.startsWith('resize-')) {
  const idx = parseInt(action.replace('resize-', ''), 10);
  resizing = true; resizeIdx = idx;
  const pt = svgPoint(e);
  resizeStartX = pt.x; resizeStartY = pt.y;
  // Save original bounding box per type:
  resizeOrigBB = { x: e.x, y: e.y, w: e.imgW || ..., h: e.imgH || ... };
}
```

### Per-type resize behavior (mousemove)

| Type | Resize behavior |
|---|---|
| **rect / circle / line / arrow / highlight / underline** | `edit.x2 = resizeStartX2 + dpx`, `edit.y2 = resizeStartY2 + dpy` |
| **image** | `edit.imgW = max(20, resizeOrigBB.w + dpx)`, `edit.imgH = max(10, resizeOrigBB.h + dpy)` |
| **text** | Recalculate `fontSize` from bounding box width |
| **freehand** | Scale all points relative to bounding box origin: `p.x = ox + (p.x - ox) * scx` |
| **comment (pdf-sign)** | Scale font size proportionally: `fontSize = max(6, round(startFontSize + dx * 0.15))` |
| **signature (pdf-sign)** | Maintain aspect ratio: `nw = max(30, startW + dx)`, `h = nw * (startH / startW)` |

### Delta computation

```javascript
// pdf-edit: viewport delta converted to PDF delta
const dx = pt.x - resizeStartX;
const dy = pt.y - resizeStartY;
const dpx = dx * (pagePdfW / pageViewportW);
const dpy = -dy * (pagePdfH / pageViewportH);  // Y inverted

// pdf-enhance: similar, using vpW/vpH and pdfPageW/pdfPageH
const dx = pt.x - resizeStartX;
const dy = pt.y - resizeStartY;
const dpx = dx * (pdfPageW / vpW);
const dpy = dy * (pdfPageH / vpH);
```

---

## 12. Coordinate Systems & Conversion

### Two coordinate spaces

| Space | Origin | Y direction | Units |
|---|---|---|---|
| **PDF** | Bottom-left | Y increases upward | PDF points (1 pt = 1/72 inch) |
| **Viewport (SVG)** | Top-left | Y increases downward | Pixels at current scale |

### Conversion functions (pdf-edit & pdf-enhance)

```javascript
function vpToPdf(vx, vy) {
  return {
    x: vx * (pagePdfW / pageViewportW),
    y: pagePdfH - vy * (pagePdfH / pageViewportH)   // flip Y
  };
}

function pdfToVp(px, py) {
  return {
    x: px * (pageViewportW / pagePdfW),
    y: (pagePdfH - py) * (pageViewportH / pagePdfH)  // flip Y
  };
}

function vpSizeToPdf(w, h) {
  return {
    w: w * (pagePdfW / pageViewportW),
    h: h * (pagePdfH / pageViewportH)                // NO flip — sizes are not positions
  };
}

function svgPoint(e) {
  const rect = svg.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.left) / rect.width) * pageViewportW,
    y: ((e.clientY - rect.top) / rect.height) * pageViewportH,
  };
}
```

### Why sizes need a separate function

`vpToPdf` applies Y-flip which is correct for positions (converting a point from viewport to PDF space). But using it for sizes (width/height) corrupts the height value because `vpToPdf(w, h)` returns `pagePdfH - h * scale` instead of `h * scale`. The `vpSizeToPdf` function scales without the flip.

### pdf-sign difference

**pdf-sign does not use PDF coordinates internally.** All elements are stored and manipulated in viewport pixel coordinates. The conversion to PDF points happens only in the Save handler, where scale factors `sx` and `sy` are applied to positions and dimensions.

---

## 13. Cross-Page Sync (pdf-enhance only)

When dragging watermarks, headers, footers, or bates stamps, the position delta is propagated to all matching elements on other pages:

```javascript
const syncTypes = ['watermark-text', 'watermark-image', 'header', 'footer', 'bates'];

// On mouseup after drag:
if (syncTypes.includes(dragType)) {
  const dx = el.x - dragOrigX;
  const dy = el.y - dragOrigY;
  for (let pg = 1; pg <= totalPages; pg++) {
    if (pg === currentPage) continue;
    const others = pageElements[pg] || [];
    for (const other of others) {
      if (other.type === dragType) { other.x += dx; other.y += dy; }
    }
  }
}
```

This ensures that dragging a watermark on page 1 also moves it on pages 2–N, maintaining consistent placement across the document.

---

## 14. Key Differences Between Tools

| Feature | pdf-edit | pdf-sign | pdf-enhance |
|---|---|---|---|
| **Fullscreen expand/collapse** | Yes | No | Yes |
| **Undo/Redo** | Yes (per-page) | No | Yes (per-page) |
| **Clear pushes history** | Yes | No | Yes |
| **Coordinate storage** | PDF points | Viewport pixels | PDF points |
| **Drag Y-offset inversion** | Yes (`-mp.y + edit.y`) | No (direct) | Yes (`-mp.y + el.y`) |
| **Resize pattern** | Full `resizeOrigBB` per type | Simple `startW/startH` | Simple `origW/origH` |
| **Cross-page drag sync** | No | No | Yes |
| **Crop support** | No | No | Yes (`setMediaBox`/`setCropBox`) |
| **Output filename** | `edited.pdf` | `signed.pdf` | `enhanced.pdf` |
| **Element types** | text, rect, circle, line, arrow, freehand, image, highlight, underline, comment | signature (image), date (text) | watermark-text, watermark-image, header, footer, bates |
