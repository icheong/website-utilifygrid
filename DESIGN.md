# Design Standards for UtilifyGrid Tools

This document outlines the UI/UX and content styling standards that all tools (both existing DONE tools and any new or AdSenseText-fixed tools) must follow to ensure a consistent look, feel, and SEO structure across the site.

## 1. Global Layout (ToolLayout.astro)

Each tool page uses the `ToolLayout.astro` layout with the following slots:

- `tool` – Interactive calculator / converter UI.
- `how-to-use` – Overview and usage instructions (maps to SEO “Overview” + “Real-World Applications”).
- `how-it-works` – Deep-dive into technical mechanics, formulas, and algorithms.
- `faq` – Frequently asked questions (must follow FAQPage schema).
- (Optional) `disclaimer` – Placed at the end of the FAQ slot.

All slots must be present even if empty (except `disclaimer` which is only needed when required).

## 2. Typography & Colors

- **Font Families**: Use `font-display` class for headings (`seo-h2`, `seo-h3-sm`) and body text defaults.
- **Color Variables**: 
  - Text: `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`
  - Backgrounds: `var(--bg-surface)`, `var(--bg-surface-2)`, `var(--bg-surface-3)`
  - Borders: `var(--border)`
  - Accent colors (for cards, badges, etc.) are defined in `global.css` as `--card-blue-*`, `--card-orange-*`, `--card-green-*`, `--error-text`, with light/dark variants.
- **Avoid Inline Styles**: Do not use `style=` for colors, fonts, margins, padding, or borders. Use utility classes or CSS variables defined in `global.css`.

### Heading Classes
- `seo-h2` – H2 section headings (Overview, Deep-Dive, FAQ).
- `seo-h3-sm` – H3 sub-headings (Real-World Applications, Technical Mechanics, etc.).
- Body text: Use `seo-p` (or `seo-p-sm`, `seo-p-none`) for all SEO content paragraphs. Do **not** add `text-secondary` to these classes — the default text color (`var(--text-primary)`) is correct for content paragraphs.

### Form Element Classes
All tool pages must use these standardised classes for form elements. Do not override their properties with inline styles unless absolutely necessary.

- **`tool-label`** – Form field labels (applies `font-size:0.72rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:0.375rem`).
  ```html
  <label class="tool-label">Loan Amount ($)</label>
  ```
- **`input-themed`** – Number and text inputs (applies `padding:0.625rem 0.875rem; border-radius:0.5rem; font-size:0.95rem; background:var(--bg-surface); border:1.5px solid var(--border)`).
  ```html
  <input id="loan-amount" type="number" class="input-themed" />
  ```
- **`select-themed`** – Dropdown selects (applies same padding, border-radius, and font-size as `input-themed`, plus a chevron background image).
  ```html
  <select id="loan-term" class="select-themed">...</select>
  ```
- **`tool-textarea`** – Monospace code/textareas (applies `font-family:var(--font-mono); font-size:0.82rem; height:240px; resize:none; line-height:1.7`). Use alongside `input-themed`:
  ```html
  <textarea id="sql-input" class="input-themed tool-textarea"></textarea>
  ```

### Font Standards
- **Headings (H1, H2, H3)**: `'Sora', system-ui, sans-serif` — applied automatically via the `h1, h2, h3, .font-display` rule.
- **Body / UI text**: Inherited from the root stylesheet (system font stack).
- **Monospace / code areas**: `'Fira Code', 'JetBrains Mono', monospace` via `var(--font-mono)` — used by `tool-textarea`, `inline-code`, and result value displays.
- **Do not** hardcode `font-family`, `font-size`, `font-weight`, or `color` on form elements; use the standardised classes above.

### `text-secondary` Usage Rules
- **Do not** add `text-secondary` to SEO content paragraphs (`seo-p`, `seo-p-sm`, `seo-p-none`, `seo-card-body`, `seo-faq-a`). These classes inherit the default text color, which is correct for readable content.
- **Do** use `text-secondary` on: form labels (`tool-label` already applies it), UI helper text, use-case card descriptions (`<p class="text-secondary" style="...">` inside `seo-card-sm`), disclaimer labels, and breadcrumb/navigation elements.
- **Do not** add `text-secondary` to FAQ answer paragraphs — the dark-mode override in `ToolLayout.astro` already handles FAQ answer coloring.

## 3. Description Text (Overview Slot)

- Use `<p class="seo-p">` for all descriptive paragraphs.
- No embedded HTML tags (e.g., `<code>`, `<strong>`, `<em>`) inside the description text unless they are part of a code example.
- For inline code snippets within description, use `<code class="inline-code">` (styled via CSS; background: `var(--bg-surface-2)`; padding: `0.1rem 0.35rem`; border-radius: `0.25rem`; font-size: `0.85rem`; font-family: `'Fira Code', monospace`).
- Keep sentences clear, concise, and free of markdown or HTML artifacts.

## 4. Real-World Applications / Use Cases

- Must be rendered as a set of `seo-card-sm` components inside a **flex column wrapper**.
- **Do not** use plain `<p>` tags, custom grid tiles, inline-styled divs, or CSS grid layouts for use‑cases.
- **Do not** use `grid grid-cols-*` classes on the use-case wrapper — this creates a tile layout that breaks the design.
- The wrapper div **must** use this exact inline style:
  ```html
  <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
  ```
- Each card inside the wrapper:
  - Outer container: `<div class="border-theme surface-2 seo-card-sm">`
  - Title: `<strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>`
  - Description: `<p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>`
- The `seo-card-sm` class provides:
  - `display: flex; flex-direction: column; gap: 0.625rem;`
  - Consistent padding, border, and background via `border-theme` and `surface-2`.
- Example (from mortgage-calculator):
  ```html
  <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
  <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
    {[
      ['Title one', 'Description one.'],
      ['Title two', 'Description two.'],
    ].map(([title, desc]) => (
      <div class="border-theme surface-2 seo-card-sm">
        <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
        <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
      </div>
    ))}
  </div>
  ```

## 5. Deep-Dive / Technical Mechanics & Formulas

- Headings use `seo-h3-sm`.
- Code snippets (SQL, MongoDB, JavaScript, formulas, etc.) must use `<code class="inline-code">` (same styling as in description).
- Do not use inline `style=` on `<code>` elements; rely on the `.inline-code` class.
- For mathematical formulas, wrap in `<code class="inline-code math">` if needed; styling is handled globally.
- Avoid hard‑coding font families, sizes, or colors inside the HTML.

## 6. FAQ Section

- The FAQ H2 heading **must** use `class="font-display seo-h2-faq"` — **not** `seo-h2`. This applies a distinct style suited to the FAQ slot's position after the how-it-works section.
- The FAQ slot must wrap all Q&A in a container div with `class="seo-faq-list"` and the FAQPage schema attributes:
  ```html
  <div class="seo-faq-list" itemscope itemtype="https://schema.org/FAQPage">
  ```
- Each question‑answer pair **must** carry three classes: `surface-2 border-theme seo-faq-card` — in that order. `surface-2` applies the themed background, `border-theme` applies the themed border, and `seo-faq-card` applies padding and radius. Omitting `surface-2` or `border-theme` results in unstyled cards that break in dark mode.
  ```html
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"
       class="surface-2 border-theme seo-faq-card">
    <h3 itemprop="name" class="seo-faq-q">{question}</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text" class="seo-faq-a">{answer}</p>
    </div>
  </div>
  ```
- **Do not** place any disclaimer or extra text inside the FAQ items; the disclaimer belongs in its own element (see below).
- **Common mistake:** Using only `class="seo-faq-card"` without `surface-2 border-theme` renders cards without background or border — this is always incorrect.

## 7. Disclaimer

- **Placement rule:** If a disclaimer is required, it **must** be placed inside the `faq` slot, after the closing `</div>` of the FAQ list container, and before the closing `</div>` of the `faq` slot. It must **never** be placed in the `how-to-use` or `how-it-works` slots.
- Use `<div class="seo-disclaimer">` with the standard inline styles: `margin-top:1.5rem; background:var(--bg-surface-2); border:1px solid var(--border); font-size:0.8rem; color:var(--text-muted); line-height:1.7`.
- The `seo-disclaimer` class must **not** be reused for other purposes (e.g., formula cards, info boxes). Use `seo-card-code` for formula displays or `surface-2 border-theme` for other content cards.
- Must **not** be inside any `itemscope` for FAQPage.
- Example structure inside the `faq` slot:
  ```html
  <div slot="faq">
    <h2 class="font-display seo-h2-faq">Frequently Asked Questions</h2>
    <div class="seo-faq-list" itemscope itemtype="https://schema.org/FAQPage">
      <!-- FAQ items here -->
    </div>
    <div class="seo-disclaimer" style="margin-top:1.5rem; background:var(--bg-surface-2); border:1px solid var(--border); font-size:0.8rem; color:var(--text-muted); line-height:1.7">
      <strong class="text-primary" style="color:var(--text-secondary)">Disclaimer:</strong> ...
    </div>
  </div>
  ```

## 8. AdSense Text Fixes (SEO Content Expansion)

When expanding thin AdSense content per the SEO template:

1. Follow the strict structure:
   - H2 Overview (`seo-h2`)
   - H3 Deep‑Dive Mechanics (`seo-h3-sm`)
   - H3 Real‑World Applications (`seo-h3-sm`) → rendered as `seo-card-sm` cards
   - H2 Expanded FAQ (`seo-h2-faq` inside the `faq` slot — **not** `seo-h2`)
   - Optional Disclaimer (as above)
   - Optional References (plain `<p class="seo-p">` if needed)
2. Ensure the total word count is 400–600 words.
3. Remove any raw HTML tags from the description text; convert inline styles to CSS classes.
4. Use only the permitted classes and variables; no inline `style=` unless absolutely required by the element (e.g., SVG `viewBox`).

## 9. Prohibited Inline Styles

The following **must not** appear in any `.astro` file (unless explicitly exempted):

- `style="color:..."`
- `style="background:..."` (except for SVG attributes like `fill` that are required by the element)
- `style="font-size:..."`, `style="font-family:..."`
- `style="margin:..."`, `style="padding:..."`, `style="border:..."`
- `style="width:..."`, `style="height:..."` (use utility classes or CSS variables)
- `style="display:..."`, `style="flex-..."`, `style="grid-..."` (use predefined classes)
- **Form elements**: Do not add inline styles to `<input>`, `<select>`, `<textarea>`, or `<label>` elements. Use `tool-label`, `input-themed`, `select-themed`, and `tool-textarea` classes instead.

Allowed inline attributes (only when necessary):
- SVG `viewBox`, `width`, `height` (if they cannot be expressed via CSS)
- ARIA labels, `role`, `itemscope`, `itemprop` (semantic attributes)
- `placeholder` on `<input>`/`<textarea>`
- `value` on form elements (when dynamically set via Astro expressions)

## 10. Responsive Layout & Spacing

- Use CSS grid utilities: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` etc., defined in `global.css`.
- Gap between items: use `gap` utility classes (or the `gap` property on parent containers via class).
- Avoid hard‑coded `grid-template-columns: 1fr 1fr;` in HTML; rely on classes.
- For flex containers, use `flex`, `flex-col`, `items-center`, `justify-between` classes where available.

## 11. Icon & SVG Styling

- All SVG icons used inside the tool or documentation must inherit `fill: var(--text-muted)` (or `currentColor`) via a `.svg-icon` class.
- Do not set `style="fill:#..."` on SVG elements; define the color in CSS.
- If an SVG needs multiple colors, use CSS variables (e.g., `--icon-primary`, `--icon-secondary`) defined in `global.css`.

## 12. Code Snippets in Documentation

- Inline code: `<code class="inline-code">`
- Code blocks (multi‑line): use `<pre><code class="language-xml">...</code></pre>` or the appropriate language class; rely on Prism or highlight.js styling (no inline styles).
- Ensure code blocks are wrapped in a container with class `code-block` if needed for margins.

## 13. Astro JSX Encoding — Do NOT Use HTML Entities in JS Strings

**Never use HTML entities (`&#8212;`, `&#176;`, `&#8594;`, `&#215;`, `&#8230;`, `&#8217;`, `&#8220;`, `&#8221;`, etc.) inside JavaScript string literals in Astro JSX.**

HTML entities only decode inside HTML content. Inside `{...}` JS expressions (e.g., FAQ arrays, template literals, mapped data), they render as literal text like `&#8212;` instead of `—`.

**Correct** (in JS strings):
```js
{ q: 'What is this?', a: 'A tool — it works.' }
{ q: 'Angle?', a: '0° → 90° → 180° → 270°' }
```

**Wrong** (HTML entities in JS strings):
```js
{ q: 'What is this?', a: 'A tool &#8212; it works.' }
{ q: 'Angle?', a: '0&#176; &#8594; 90&#176; &#8594; 180&#176; &#8594; 270&#176;' }
```

Use actual Unicode characters directly: `—` (em dash), `–` (en dash), `°` (degree), `→` (arrow), `×` (multiply), `…` (ellipsis), `'` (right single quote), `"` / `"` (double quotes).

## 14. Accessibility

- All form inputs must have associated `<label>` elements (either wrapping the input or using `for`/`id`).
- Buttons must have discernible text (no icon‑only buttons without an accessible label).
- Use `aria-label` where needed for custom controls.
- Ensure sufficient color contrast (use the defined `--text-*` and `--bg-surface-*` variables which are tested for WCAG AA).

## 15. Summary Checklist for Each Tool

- [ ] Uses `ToolLayout.astro` with all required slots.
- [ ] No inline `style=` for visual properties (colors, fonts, spacing, borders).
- [ ] Description text uses `<p class="seo-p">` with only `<code class="inline-code">` for snippets.
- [ ] No `text-secondary` on SEO content paragraphs (`seo-p`, `seo-p-sm`, `seo-p-none`, `seo-card-body`, `seo-faq-a`).
- [ ] Real‑world applications rendered as `seo-card-sm` flex‑column cards.
- [ ] Deep‑dive headings use `seo-h3-sm`; code snippets use `<code class="inline-code">`.
- [ ] FAQ follows FAQPage schema with `surface-2 border-theme seo-faq-card` on each item; FAQ H2 uses `seo-h2-faq`.
- [ ] Disclaimer (if present) is inside the `faq` slot only — never in `how-to-use` or `how-it-works`. Uses `<div class="seo-disclaimer">` with standard inline styles.
- [ ] No raw HTML tags (e.g., `<code style=...>`, `<strong>`, `<em>`) in description text.
- [ ] **No HTML entities (`&#...;`) inside JS string literals** — use actual Unicode characters (see section 13).
- [ ] All colors, spacing, fonts come from CSS classes or variables in `global.css`.
- [ ] Builds successfully (`npm run build` passes).

By adhering to this DESIGN.md, every tool will present a uniform, professional, and SEO‑friendly experience, and any future work (AdSense fixes or new tools) will integrate seamlessly.

--- 
*Updated: 2026-06-17*  
*Based on the styling observed in mortgage‑calculator, compound‑interest‑retirement, percentage‑calculator, bmi‑calculator, and all other DONE tools listed in seoclean‑tooltracing.MD.*