# UtilifyGrid — Style Standardisation Implementation Plan

**Purpose:** Bring every tool page into full alignment with `DESIGN.md` and the existing CSS variable / theme system, eliminating the current inconsistencies in buttons, inputs, result panels, layout chrome, and colour usage.

---

## 1. Audit Findings — What's Broken

### 1.1 Buttons

| Issue | Examples observed | Severity |
|---|---|---|
| **Mix of solid blue vs outline vs grey ghost** | BMI uses solid `#1D4ED8` "Calculate BMI" button; Word Counter has a plain text "✕ Clear" link; JWT Debugger has `bg-white border` ghost buttons for "Load sample / Clear" | High |
| **No consistent hover / focus ring** | Some buttons have no visible focus state at all | High |
| **Sizing inconsistency** | Some action buttons are `px-4 py-2`, others `px-6 py-3`; secondary buttons have no padding standard | Medium |
| **Dark mode breakage** | Ghost buttons on dark backgrounds become near-invisible (white bg on dark surface) | High |

**What DESIGN.md says:**
- Primary action: `bg-blue-600 hover:bg-blue-700` (light) / `bg-blue-500 hover:bg-blue-600` (dark)
- Success/copy state: `bg-emerald-600 hover:bg-emerald-700`
- Secondary / ghost: explicit `border border-slate-200 dark:border-slate-700` with clear bg

### 1.2 Inputs, Selects, Textareas

| Issue | Examples observed | Severity |
|---|---|---|
| **Inconsistent border radius** | BMI uses `rounded-lg`; Mortgage sliders have no visible border at all; JWT textarea has `rounded-md` | Medium |
| **Focus ring varies wildly** | BMI: blue ring; some tools: browser default; others: no ring | High |
| **Dark mode input backgrounds** | `ToolLayout.astro` has CSS overrides but inline `style=` attributes on individual tools bypass them | High |
| **Placeholder colour** | Some tools use `#94A3B8` hardcoded, others rely on browser default (near-invisible in dark) | Medium |

**What DESIGN.md says:**
- Unified class: `w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 … focus:ring-4 focus:ring-blue-500/10`
- This must map to the existing `input-themed` CSS class in `global.css`

### 1.3 Result / Output Panels

| Issue | Examples observed | Severity |
|---|---|---|
| **No consistent "result card" visual** | BMI result is a plain div with inline styles; Mortgage summary uses coloured boxes with hardcoded hex; Word Counter stats have a custom grid with no border | High |
| **Colour tokens bypassed** | Mortgage uses `background:#EFF6FF; color:#1D4ED8` hardcoded (breaks dark mode). Word Counter uses hardcoded `#0F172A` text | High |
| **Missing highlight/accent border** | DESIGN.md calls for a surface card with `border border-slate-200 dark:border-slate-700 shadow-sm`; most result areas have no border or shadow | Medium |

### 1.4 Section / Card Containers (Tool Workspace)

| Issue | Observed | Severity |
|---|---|---|
| **`tool-card-surface` not always wrapping sub-sections** | JWT "Token parts" breakdown, Mortgage formula table, and Word Counter stats grid sit bare inside the card with no inner grouping | Medium |
| **Inline `style=` overrides throughout** | ~80% of tool pages use inline hex colours instead of CSS vars, causing dark mode failures even where `ToolLayout.astro` tries to override them | Critical |
| **No consistent sub-section divider** | Some tools use `border-t border-slate-200`; others use a margin gap; others use a background colour shift | Low |

### 1.5 Typography

| Issue | Observed | Severity |
|---|---|---|
| **Sub-headings inside tool workspace are inconsistent** | BMI: `text-lg font-semibold`; JWT: `text-sm font-semibold uppercase`; Mortgage: `font-bold text-sm` in inline styles | Medium |
| **Mono output text not consistently applied** | JWT JSON panels use `font-mono`; Mortgage numbers are plain sans; Word Counter stats are sans | Low |
| **Label style varies** | BMI labels are `text-sm text-gray-600`; JWT labels are `text-xs font-bold uppercase`; DESIGN.md specifies `text-sm font-medium text-slate-700` | Medium |

### 1.6 Toggle / Mode Switcher Buttons

| Issue | Observed | Severity |
|---|---|---|
| **BMI metric/imperial toggles are custom pill buttons not matching any standard** | Active state uses `bg-blue-600 text-white`; inactive uses `bg-gray-100 text-gray-600` — fine in light, broken dark | Medium |
| **No shared toggle-group class** | Each tool invents its own toggle pattern | Medium |

---

## 2. Standardised Component Tokens

These are the canonical patterns all tools must use going forward. They map directly to `DESIGN.md` and the existing `global.css` vars.

### 2.1 Button Hierarchy

```
PRIMARY ACTION (calculate, generate, convert, copy)
  class: "btn-primary"
  Light: bg-blue-600 text-white hover:bg-blue-700 
  Dark:  bg-blue-500 hover:bg-blue-600
  Shape: rounded-lg px-5 py-2.5 text-sm font-semibold
  Focus: ring-2 ring-blue-500/50 ring-offset-2
  
SECONDARY / GHOST (clear, reset, load sample)
  class: "btn-secondary"
  Light: bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-100
  Dark:  border-slate-600 text-slate-300 hover:bg-slate-700
  Shape: rounded-lg px-4 py-2 text-sm font-medium
  
SUCCESS / COPY CONFIRMED
  class: "btn-success" (applied via JS for 2000ms)
  bg-emerald-600 text-white (both modes)
  
TOGGLE GROUP (metric/imperial, mode A/B)
  class: "toggle-group" on wrapper, "toggle-btn" on each item
  Active:   bg-blue-600 text-white (light) / bg-blue-500 text-white (dark)
  Inactive: bg-slate-100 text-slate-600 (light) / bg-slate-700 text-slate-300 (dark)
  Shape: rounded-md px-3 py-1.5 text-sm font-medium, no gap between items, outer wrapper rounded-lg border
```

### 2.2 Input / Control Classes

All inputs, selects, textareas must use **`input-themed`** (already in `global.css`) which maps to:
```css
width: 100%;
padding: 0.625rem 0.875rem;
border-radius: 0.5rem;
font-size: 0.95rem;
box-sizing: border-box;
background: var(--bg-surface);
border: 1.5px solid var(--border);
color: var(--text-primary);
focus: border #1D4ED8, ring 3px rgba(29,78,216,0.15)
placeholder: var(--text-muted)
```

No tool should use `class="border border-gray-200 rounded"` or inline style equivalents. Tools should use bare `class="input-themed"` with no inline style overrides for width, padding, border-radius, font-size, or box-sizing — these are all handled by the base class. The only acceptable inline override is for compact inputs in nested sub-sections that need smaller padding (e.g., `style="padding:0.5rem 0.75rem; font-size:0.875rem"`).

### 2.3 Result / Output Card

```
Wrapper:
  background: var(--bg-surface-2)
  border: 1.5px solid var(--border)
  border-radius: 0.75rem
  padding: 1.25rem
  
Numeric headline value:
  font-family: 'Sora', sans-serif
  font-size: clamp(1.5rem, 3vw, 2rem)
  font-weight: 700
  color: var(--color-brand-blue) [or category accent]
  
Label below value:
  font-size: 0.75rem
  font-weight: 600
  text-transform: uppercase
  letter-spacing: 0.06em
  color: var(--text-muted)
  
Success / positive result accent:
  Left border: 3px solid #10B981 (emerald)
  
Warning / caution accent:
  Left border: 3px solid #F59E0B (amber)
```

### 2.4 Info / Formula Rows (inside tool workspace)

```
background: var(--bg-surface-2)
border: 1px solid var(--border)
border-radius: 0.5rem
padding: 0.75rem 1rem
Label: text-xs font-semibold uppercase tracking-wide color: var(--text-muted)
Value: font-mono text-sm color: var(--text-primary)
```

### 2.5 Copy-to-Clipboard Pattern

Every tool with a copyable output must implement:
```javascript
// On copy click:
btn.textContent = '✓ Copied!';
btn.classList.add('btn-success');
setTimeout(() => {
  btn.textContent = 'Copy';
  btn.classList.remove('btn-success');
}, 2000);
```

---

## 3. Global CSS Additions Required

Add to `src/styles/global.css`:

```css
/* ── Standardised button system ─────────────────────────── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1.25rem;
  background: #1D4ED8;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s;
  text-decoration: none;
}
.btn-primary:hover  { background: #1E40AF; }
.btn-primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(29,78,216,0.4);
}
.dark .btn-primary         { background: #3B82F6; }
.dark .btn-primary:hover   { background: #2563EB; }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1.5px solid var(--border);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.btn-secondary:hover { background: var(--bg-surface-2); border-color: var(--border-hover); }
.btn-secondary:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(29,78,216,0.2); }

.btn-success {
  background: #059669 !important;
  color: #fff !important;
  border-color: #059669 !important;
}

/* ── Toggle group ────────────────────────────────────────── */
.toggle-group {
  display: inline-flex;
  background: var(--bg-surface-2);
  border: 1.5px solid var(--border);
  border-radius: 0.625rem;
  padding: 0.2rem;
  gap: 0.15rem;
}
.toggle-btn {
  padding: 0.35rem 0.875rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  border: none;
  background: transparent;
  transition: background 0.15s, color 0.15s;
}
.toggle-btn.active,
.toggle-btn[aria-pressed="true"] {
  background: #1D4ED8;
  color: #fff;
}
.dark .toggle-btn.active { background: #3B82F6; }
.toggle-btn:not(.active):hover { background: var(--bg-surface-3); color: var(--text-primary); }

/* ── Result card ─────────────────────────────────────────── */
.result-card {
  background: var(--bg-surface-2);
  border: 1.5px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.25rem;
}
.result-value {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-brand-blue);
  line-height: 1.1;
}
.result-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-muted);
  margin-top: 0.25rem;
}
.result-card.accent-success { border-left: 3px solid #10B981; }
.result-card.accent-warning { border-left: 3px solid #F59E0B; }
.result-card.accent-blue    { border-left: 3px solid #1D4ED8; }

/* ── Info row (formula / breakdown row) ─────────────────── */
.info-row {
  background: var(--bg-surface-2);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}
.info-row .info-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  flex-shrink: 0;
}
.info-row .info-value {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: var(--text-primary);
  text-align: right;
}
```

---

## 4. Tool-by-Tool Remediation List

### Priority 1 — Fix dark mode breakage (critical)

These tools use hardcoded hex colours that make them unusable in dark mode:

| Tool | Key problem | Fix |
|---|---|---|
| `bmi-calculator` | Result box: `background:#EFF6FF; color:#1D4ED8` inline | Replace with `.result-card.accent-blue` |
| `mortgage-calculator` | Summary stats: `background:#F0FDF4; color:#166534` etc. | Replace all coloured summary boxes with `result-card` + accent classes |
| `compound-interest-retirement` | Chart legend: hardcoded `#1D4ED8` and `#10B981` text | Use CSS vars for text, keep hex only for SVG/Canvas draws |
| `compound-interest-wealth-calculator` | Same pattern | Same fix |
| `hex-to-rgb` | Output panel: `background:#F8FAFC` hardcoded | Replace with `var(--bg-surface-2)` |
| `percentage-calculator` | Result rows: `color:#0F172A` inline | Replace with `color:var(--text-primary)` |
| `word-counter` | Stats grid cells: hardcoded text and bg | Replace with `result-card` grid |
| `freelance-invoice-tax-calculator` | Receipt area: `background:#fff` hardcoded | Replace with `var(--bg-surface)` |

### Priority 2 — Button standardisation

| Tool | Current state | Target state |
|---|---|---|
| `bmi-calculator` | `bg-blue-600` (close but inconsistent padding) | `.btn-primary` class |
| `word-counter` | `✕ Clear` plain anchor | `.btn-secondary` |
| `jwt-debugger` | `bg-white border` ghost for "Load sample" | `.btn-secondary` |
| `percentage-calculator` | Grey `bg-gray-100` buttons | `.btn-secondary` |
| `csv-to-json-xml-converter` | Mixed outline and solid | Standardise to btn hierarchy |
| `json-to-typescript` | "Generate" is bold; "Copy" is a text link | "Generate" → `.btn-primary`; "Copy" → `.btn-secondary` with clipboard pattern |
| `css-flexbox-grid-sandbox` | "Copy CSS" is custom; reset is a plain link | Apply btn classes |
| `slug-generator` | "Convert" custom style | `.btn-primary` |
| All tools with copy | Inconsistent copy button appearance | Unified `.btn-secondary` → `.btn-success` pattern |

### Priority 3 — Toggle group standardisation

| Tool | Current state | Target |
|---|---|---|
| `bmi-calculator` | Custom pill toggle (metric/imperial) | `.toggle-group` + `.toggle-btn` |
| `json-to-typescript` | Custom tab (Interface/Zod) | `.toggle-group` |
| `markdown-to-html-converter` | Edit/Preview tabs | `.toggle-group` |
| `compression-inspector` | Brotli/Gzip comparison | `.toggle-group` |
| `ev-novated-lease-calculator` | Mode selector | `.toggle-group` |
| Any tool with A/B/C mode | Custom per-tool | `.toggle-group` |

### Priority 4 — Input field standardisation

All tool pages must audit every `<input>`, `<select>`, `<textarea>` and apply `input-themed` class. Remove any competing inline `style=` attributes on those elements — the base class now includes `width:100%`, `padding:0.625rem 0.875rem`, `border-radius:0.5rem`, `font-size:0.95rem`, and `box-sizing:border-box`, so no inline overrides are needed for standard inputs. Only add inline styles for exceptional cases such as compact inputs in nested sub-sections requiring smaller padding.

Special note: `<select>` elements use `.select-themed` which inherits the same base properties as `input-themed` plus:
```css
.select-themed {
  /* inherits input-themed base (width, padding, border-radius, etc.) plus: */
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* chevron */
  padding-right: 2.25rem;
}
```
`select-themed` is already in `global.css`.

---

## 5. ToolLayout.astro Changes

Add these two blocks to the existing `<style>` section:

```astro
/* Ensure btn classes work inside tool workspace */
:root.dark .tool-card-surface .btn-primary { background: #3B82F6; }
:root.dark .tool-card-surface .btn-primary:hover { background: #2563EB; }

/* Prevent inline-style bg/color on result areas from overriding theme in dark */
:root.dark .tool-card-surface [class*="result-card"] {
  background: var(--bg-surface-2) !important;
  color: var(--text-primary) !important;
}
```

Also: Add a utility `copy-btn` composable to the bottom `<script>` block in `ToolLayout.astro` so every tool can call `initCopyBtn(selector)` rather than re-implementing the 2s flash pattern:

```javascript
// Shared copy-to-clipboard helper — available to all tool pages
window.initCopyBtn = function(selector, getTextFn) {
  document.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = typeof getTextFn === 'function' ? getTextFn(btn) : btn.dataset.copy;
      if (!text) return;
      await navigator.clipboard.writeText(text);
      const original = btn.textContent;
      btn.textContent = '✓ Copied!';
      btn.classList.add('btn-success');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('btn-success');
      }, 2000);
    });
  });
};
```

---

## 6. Homepage & Category Page Fixes

### Homepage (`index.astro`)
- Featured tool cards already use `tool-card-themed` — no change needed
- Category filter buttons: audit for consistent active/inactive state using brand blue `#1D4ED8` / `var(--bg-surface-2)` — must not use hardcoded `#6366F1` (indigo) which appears on some cards

### Category page (`[category].astro`)
- Tool cards use `bg-white rounded-2xl border border-gray-200` — these are Tailwind classes that bypass the CSS var system
- Replace with `tool-card-themed` class (already defined in `global.css`)
- The "Browse Other Categories" grid also uses `bg-white` hardcoded — same fix

---

## 7. Implementation Sequence

Execute in this order to avoid regressions:

1. **`global.css`** — Add all new classes from Section 3 (non-breaking, additive only)
2. **`ToolLayout.astro`** — Add shared copy helper script + dark mode result-card override
3. **`[category].astro`** — Swap hardcoded Tailwind classes to `tool-card-themed`
4. **Priority 1 tools** (dark mode critical) — `bmi-calculator`, `mortgage-calculator`, `word-counter`, `hex-to-rgb`, `percentage-calculator`
5. **Priority 2 tools** (button standardisation) — Work through tool list, ~4–5 tools per batch
6. **Priority 3 tools** (toggle groups) — After buttons are done
7. **Priority 4** (input audit) — Final sweep of all remaining tools

---

## 8. Definition of "Done" per Tool

A tool page is considered style-compliant when:
- [ ] No hardcoded hex colour in `style=` attributes (exception: SVG/Canvas pixel-accurate draws only)
- [ ] All buttons use `.btn-primary`, `.btn-secondary`, or `.btn-success` classes
- [ ] All inputs/selects/textareas use `.input-themed` or `.select-themed` with no inline style overrides for width, padding, border-radius, font-size, or box-sizing
- [ ] Mode/type toggles use `.toggle-group` / `.toggle-btn`
- [ ] Result display uses `.result-card` (with optional accent class)
- [ ] Copy buttons implement the 2s flash pattern via `window.initCopyBtn` or equivalent
- [ ] Tool renders correctly in both light and dark mode (manual check)
- [ ] No inline `style="color:#..."` or `style="background:#..."` on any text/container element

---

## 9. What NOT to Change

- **Header** (`BaseLayout.astro`) — The dark blue `#1E3A8A` nav is intentional brand chrome, not a tool
- **Footer** — Same; dark `#0B1120` is intentional
- **AdSense placements** — Do not touch ad slot positioning or sizing
- **SEO slots** (how-to-use, how-it-works, FAQ) — Content and typography in these sections is fine; focus fixes only on the `tool-card-surface` workspace
- **CSS vars themselves** — The variable naming system in `global.css` is correct; only add classes, don't rename vars
- **SVG/Canvas colour values** — Chart lines, graph fills, and drawn shapes may keep hardcoded hex since they are visual encoding, not UI chrome

---

*Document produced: 2026-06-04. Review against live site before each implementation batch.*
