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
- [x] phev-novated-lease-calculator
- [x] regex-toolkit
- [x] crontab-expression-visualizer
- [x] sql-to-nosql
- [x] git-command-flow-builder
- [x] cpm-ad-spend-calculator
- [x] compound-interest-wealth-calculator
- [x] kids-savings-compound-interest-visualizer
- [x] saas-churn-ltv-cac-calculator
- [x] car-loan-amortization-calculator
- [x] freelance-invoice-tax-calculator
- [x] csv-to-json-xml-converter
- [x] sql-schema-syntax-translator
- [x] unix-timestamp-converter
- [x] epub-to-pdf-formatter
- [x] length-converter
- [x] weight-mass-converter
- [x] volume-converter
- [x] temperature-converter
- [x] area-converter
- [x] pressure-converter
- [x] energy-converter
- [x] power-converter
- [x] force-converter
- [x] time-converter
- [x] angle-converter
- [x] fuel-consumption-converter
- [x] numbers-converter
- [x] data-storage-converter
- [x] angular-velocity-converter
- [x] acceleration-converter
- [x] angular-acceleration-converter
- [x] density-converter
- [x] specific-volume-converter
- [x] moment-of-inertia-converter
- [x] moment-of-force-converter
- [x] pdf-merge
- [x] pdf-split
- [x] pdf-organize
- [x] pdf-delete-pages
- [x] pdf-rotate
- [x] pdf-reverse-pages
- [x] pdf-ocr
- [x] pdf-alternate-merge
- [x] pdf-n-up
- [x] pdf-edit
- [x] pdf-sign
- [x] qr-code
- [x] pdf-enhance
- [x] currency-converter
- [x] prompt-architect-tokenizer
- [x] prompt-chain-builder
- [x] hallucination-fact-check-guard
- [x] structured-data-ai-formatter
- [x] token-analyzer
- [x] prompt-safety-stress-tester
- [x] ai-brand-voice-gauge
- [x] markdown-sanitizer
- [x] html-to-markdown
- [x] plagiarism-compare-checker
- [x] timezone-schedule-picker
- [x] htaccess-nginx-redirect-builder
- [x] compression-inspector
- [x] password-hash-evaluator
- [x] meta-tag-og-previewer
- [x] macro-calorie-deficit-allocator
- [x] bmr-katch-mcardle-calculator
- [x] ovulation-fertility-window
- [x] hydration-fluid-loss-calculator
- [x] home-renovation-cost-estimator
- [x] amazon-fba-profit-estimator
- [x] solar-panel-roi-estimator
- [x] freelance-project-scope-estimator
- [x] strata-sinking-fund-estimator
- [x] code-diff-checker
- [x] markdown-to-html-converter
- [x] json-schema-validator
- [x] variable-case-converter
- [x] smart-log-cleaner
- [x] delimiter-swapper
- [x] text-column-extractor
- [x] anagram-word-puzzle-finder
- [x] bulk-case-mutator
- [x] json-unescaper
- [x] kaprekar-constant-calculator
- [x] torque-converter
- [x] fuel-efficiency-mass-converter
- [x] fuel-efficiency-volume-converter
- [x] temperature-interval-converter
- [x] thermal-expansion-converter
- [x] thermal-resistance-converter
- [x] thermal-conductivity-converter
- [x] specific-heat-capacity-converter
- [x] heat-density-converter
- [x] heat-flux-density-converter
- [x] heat-transfer-coefficient-converter
- [x] convert-to-pdf
- [x] convert-from-pdf
- [x] pdf-optimize-and-repair
- [x] pdf-secure
- [x] json-path-query-evaluator
- [x] json-diff-patch-comparer
- [x] json-yaml-toml-converter
- [x] json-minifier
- [x] json-fixer
- [x] json-to-html-table
- [x] json-string-escaper
- [x] bson-messagepack-decoder
- [x] json-tree-visualizer
- [x] mock-json-generator
- [x] pii-redactor
- [x] pi-explorer
