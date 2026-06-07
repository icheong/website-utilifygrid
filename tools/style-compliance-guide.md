# UtilifyGrid Tool Stylization Checklist

## 1. Core Stylization Requirements
- [ ] Replace all hardcoded hex colors (#1D4ED8/etc) with CSS vars:
  - Brand colors: `var(--color-brand-blue)`
  - Text colors: `var(--text-primary)`, `var(--text-secondary)`
  - Backgrounds: `var(--bg-surface-2)` for result cards
- [ ] Buttons/Inputs:
  - Primary: `.btn-primary` (blue 600 dark/500 dark)
  - Secondary: `.btn-secondary` (transparent border-slate-200)
  - Toggle groups: `.toggle-group` wrapper with `.toggle-btn` elements
- [ ] Result cards:
  - Wrapper: `.result-card` with `var(--result-card-bg)`
  - Accents: `.accent-success` (emerald 500), `.accent-warning` (amber 500)
- [ ] Typography:
  - Text: `text-primary` on light, `text-white` on dark
  - Code/text outputs: `font-mono` in result cards

## 2. Implementation Process
1. Audit all tools using `glob "src/tools/**/*.tsx"`
2. Fix dark mode breakage in Priority 1 tools first
3. Apply standardized button/input classes using `edit` tool
4. Add result-card components with proper accent borders
5. Standardize typography with class-based text styles
6. Validate dark mode compatibility with
`/:root.dark"`CSS overrides

## 3. Result-Card Component Pattern
```rust
<!-- CSS -->
.result-card {
  @apply bg-[var(--bg-surface-2)];
  border: 1.5px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.result-value {
  @apply text-[var(--color-brand-blue)]
  Font-family: 'Sora', sans-serif;
}

.result-label {
  @apply text-[var(--text-muted)]
}
```

## 4. Style Validation Rules
1. No inline style attributes for color/background
2. All toggle groups use `.toggle-group` wrapper
3. Buttons must use class-based styling (no hex in CSS)
4. Result cards must have consistent padding (1.25rem)
5. Inputs/textareas must use `.input-themed`
6. Copy buttons require `window.initCopyBtn` implementation

## 5. Style Compliance Checklist
```bash
✅ Primary button uses .btn-primary
✅ Inputs/selects use .input-themed
✅ Result card has accent border
✅ Text uses class-based styling(.text-primary)
✅ Toggle groups use .toggle-group class
✅ Copy button implements flash animation
✅ No hardcoded hex colors found

# Command Reference
> rup sop tools/style-check
> rup sop tools/input-audit
> rup sop tools/result-card-validate
```