# SEO Content Expansion — Tool Tracing

## PROMPT
implement new SEO method {file:seoclean-AdSenseText3.MD} on next 4 tool in {file:seoclean-tooltracing.MD}. No functionality or styling must be broken.

## Instructions

Follow these steps to expand a tool page's SEO content consistently:

### Target
Expand each tool page's SEO content slots (`how-to-use`, `how-it-works`, `faq`) to **800+ words total**.

### Structure (3 slots)

**1. `how-to-use` slot — Target ~200 words**
- Open with a 2-3 sentence intro paragraph: what the tool does, who it's for, and one concrete use case.
- Keep the existing 4 cards. Expand each card description to 2-3 sentences with practical detail (what the user sees, what happens, edge cases).

**2. `how-it-works` slot — Target ~300 words**
- Open with a 2-3 sentence intro: what happens under the hood, what technology is used, and that it runs client-side.
- Keep existing `h3` subsections. Expand each to 2-3 sentences with technical depth — mention algorithms, data structures, browser APIs, standards (e.g., IEEE 754, RFC, Fisher-Yates, crypto.getRandomValues()).
- If a subsection is thin, add a new `h3` (e.g., "Session History", "Privacy by Design", "Edge Cases").

**3. `faq` slot — Target ~350 words**
- Keep all existing FAQ questions. Expand each answer to 2-3 sentences with specific detail.
- Add **2 new FAQ questions** with `itemscope`/`itemprop` schema.org markup matching the existing pattern.
- New questions should address: edge cases, privacy, offline use, or comparison with alternatives.

### Rules
- Only modify content inside the three `slot` divs. Do NOT touch tool UI, JavaScript, or `<style>`.
- Keep all existing HTML structure, CSS classes (`seo-h2`, `seo-h3-sm`, `seo-p`, `seo-card-sm`, `seo-faq-card`, `seo-faq-q`, `seo-faq-a`), and schema.org markup.
- Content must sound like a professional human wrote it. No marketing fluff, no exclamation marks, no AI-filler phrases ("Revolutionize!", "Game-changing!").
- Use technical terms where appropriate. Reference real-world use cases.
- For financial/health/YMYL tools, include a disclaimer at the bottom of the `faq` slot.
- After editing, run `npx astro build` to verify no compilation errors.

### Template for new FAQ items
```html
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" class="surface-2 border-theme seo-faq-card">
  <h3 itemprop="name" class="seo-faq-q">[Your question here]</h3>
  <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
    <p itemprop="text" class="seo-faq-a">[Your 2-3 sentence answer here]</p>
  </div>
</div>
```

---

## Completed

- [x] coin-flipper
- [x] alphabet-randomizer
- [x] duplicate-line-remover
- [x] list-randomizer
- [x] random-number-generator
- [x] date-randomizer
- [x] whitespace-trimmer
- [x] slug-generator
- [x] json-prettifier
- [x] lorem-ipsum-customizer
- [x] dice-roll-simulator

## TODO

- [x] mortgage-calculator
- [x] compound-interest-retirement
- [x] percentage-calculator
- [x] bmi-calculator
- [x] word-counter
- [x] colour-palette-css-generator
- [x] jwt-debugger
- [x] css-flexbox-grid-sandbox
- [x] json-to-typescript
- [x] ev-novated-lease-calculator
- [ ] phev-novated-lease-calculator
- [ ] regex-toolkit
- [ ] crontab-expression-visualizer
- [ ] sql-to-nosql
- [ ] git-command-flow-builder
- [ ] cpm-ad-spend-calculator
- [ ] compound-interest-wealth-calculator
- [ ] kids-savings-compound-interest-visualizer
- [ ] saas-churn-ltv-cac-calculator
- [ ] car-loan-amortization-calculator
- [ ] freelance-invoice-tax-calculator
- [ ] csv-to-json-xml-converter
- [ ] sql-schema-syntax-translator
- [ ] unix-timestamp-converter
- [ ] epub-to-pdf-formatter
- [ ] length-converter
- [ ] weight-mass-converter
- [ ] volume-converter
- [ ] temperature-converter
- [ ] area-converter
- [ ] pressure-converter
- [ ] energy-converter
- [ ] power-converter
- [ ] force-converter
- [ ] time-converter
- [ ] angle-converter
- [ ] fuel-consumption-converter
- [ ] numbers-converter
- [ ] data-storage-converter
- [ ] angular-velocity-converter
- [ ] acceleration-converter
- [ ] angular-acceleration-converter
- [ ] density-converter
- [ ] specific-volume-converter
- [ ] moment-of-inertia-converter
- [ ] moment-of-force-converter
- [ ] pdf-merge
- [ ] pdf-split
- [ ] pdf-organize
- [ ] pdf-delete-pages
- [ ] pdf-rotate
- [ ] pdf-reverse-pages
- [ ] pdf-ocr
- [ ] pdf-alternate-merge
- [ ] pdf-n-up
- [ ] pdf-edit
- [ ] pdf-sign
- [ ] qr-code
- [ ] pdf-enhance
- [ ] currency-converter
- [ ] prompt-architect-tokenizer
- [ ] prompt-chain-builder
- [ ] hallucination-fact-check-guard
- [ ] structured-data-ai-formatter
- [ ] token-analyzer
- [ ] prompt-safety-stress-tester
- [ ] ai-brand-voice-gauge
- [ ] markdown-sanitizer
- [ ] html-to-markdown
- [ ] plagiarism-compare-checker
- [ ] timezone-schedule-picker
- [ ] htaccess-nginx-redirect-builder
- [ ] compression-inspector
- [ ] password-hash-evaluator
- [ ] meta-tag-og-previewer
- [ ] macro-calorie-deficit-allocator
- [ ] bmr-katch-mcardle-calculator
- [ ] ovulation-fertility-window
- [ ] hydration-fluid-loss-calculator
- [ ] home-renovation-cost-estimator
- [ ] amazon-fba-profit-estimator
- [ ] solar-panel-roi-estimator
- [ ] freelance-project-scope-estimator
- [ ] strata-sinking-fund-estimator
- [ ] code-diff-checker
- [ ] markdown-to-html-converter
- [ ] json-schema-validator
- [ ] variable-case-converter
- [ ] smart-log-cleaner
- [ ] delimiter-swapper
- [ ] text-column-extractor
- [ ] anagram-word-puzzle-finder
- [ ] bulk-case-mutator
- [ ] json-unescaper
- [ ] kaprekar-constant-calculator
- [ ] torque-converter
- [ ] fuel-efficiency-mass-converter
- [ ] fuel-efficiency-volume-converter
- [ ] temperature-interval-converter
- [ ] thermal-expansion-converter
- [ ] thermal-resistance-converter
- [ ] thermal-conductivity-converter
- [ ] specific-heat-capacity-converter
- [ ] heat-density-converter
- [ ] heat-flux-density-converter
- [ ] heat-transfer-coefficient-converter
- [ ] convert-to-pdf
- [ ] convert-from-pdf
- [ ] pdf-optimize-and-repair
- [ ] pdf-secure
- [ ] json-path-query-evaluator
- [ ] json-diff-patch-comparer
- [ ] json-yaml-toml-converter
- [ ] json-minifier
- [ ] json-fixer
- [ ] json-to-html-table
- [ ] json-string-escaper
- [ ] bson-messagepack-decoder
- [ ] json-tree-visualizer
- [ ] mock-json-generator
- [ ] pii-redactor
- [ ] pi-explorer
