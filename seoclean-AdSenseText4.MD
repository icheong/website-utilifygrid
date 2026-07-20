# SEO Content Expansion Prompt — v4

## Context

Google AdSense continues to flag our tool pages as "Low Value Content" even after v3 content expansion. v3 addressed boilerplate language, templated structure, and developer jargon across all 133 tools — but Google's classifier still treats the site as low quality.

## Root Cause Analysis

After reviewing the site holistically, the remaining issues are:

1. **Cross-tool structural similarity** — Even with unique content, every tool page follows the same layout: 3-4 use-case cards, 2-4 h3 subsections, 5-6 FAQ items. Google's classifier detects this pattern across 133 pages and flags it as templated at scale.

2. **Thin category pages** — Category pages (`src/pages/category/[category].astro`) show a 1-2 sentence `longDescription` and a grid of tool cards. No editorial content, no guidance, no comparison. Google sees these as thin index pages.

3. **No E-E-A-T signals** — No author attribution, no "who built this" page, no demonstration of expertise beyond what the tool already shows on screen. Google's Helpful Content system expects Experience, Expertise, Authoritativeness, and Trust.

4. **No external references** — Content never links to authoritative sources (WHO, NIST, RFC, government sites). Google expects outgoing links to reputable sources as a quality signal.

5. **No unique editorial value** — Content describes what the tool does but rarely provides insight beyond what the user can already see in the tool's UI. There's no "why this formula", no "common mistakes", no "when NOT to use this".

6. **Meta descriptions are tool-output summaries** — Most meta descriptions follow the pattern "[Tool name] — [function]. Free, fast, runs in browser." Google may treat these as auto-generated.

7. **No site-level authority** — The About page is minimal. No team/author pages. No blog or editorial section. Google has no way to assess who is behind 133 tools.

---

## Instructions

You are improving the SEO content and site-level signals for utilifygrid.com. The site has 133 tools across 11 categories.

### Scope of work

This prompt covers **site-level and structural changes**, not individual tool rewrites. The 133 tool pages already have v3 content and should NOT be modified in this phase unless specifically noted.

---

## Phase 1: Category Page Enrichment

### Target files
- `src/pages/category/[category].astro`
- `src/data/categories.json`

### What to do

**A. Expand `longDescription` in `categories.json`**

Each category's `longDescription` currently runs 1-2 sentences (50-80 words). Expand each to 3-5 paragraphs (200-350 words) that:

- Open with who this category is for and what problems it solves (not "This category contains tools for...")
- Explain 2-3 specific scenarios where someone would use multiple tools in this category
- Name specific tools within the category and how they relate to each other
- Include at least one comparison or recommendation ("If you're dealing with X, start with Tool A; if you need Y, Tool B is more appropriate")
- Reference relevant standards, formulas, or published guidelines where applicable
- End with a brief note on privacy/approach (one sentence maximum)

**Do NOT**:
- Use the same opening structure across categories
- List all tools in the category (the grid below does that)
- Mention "client-side", "browser-based", or "no data transmission"

**B. Add editorial content blocks to `category.astro`**

After the `longDescription` paragraph and before the tools grid, add a new `<section>` with:

1. **"How to choose the right tool"** — A 100-150 word section with 2-3 bullet points guiding users to the right tool based on their task. Use `<h2>` heading.

2. **"Common use cases"** — A 100-150 word section with 2-3 concrete, numbered scenarios (e.g., "1. Freelance accountant preparing quarterly BAS — use the GST Calculator first, then the Taxable Income Calculator for the final figure"). Use `<h2>` heading.

3. **"Related categories"** — A 50-100 word section linking to 1-2 related categories with a brief explanation of when to use each. Use `<h2>` heading.

All new sections should be wrapped in `<div>` elements with inline styles matching the existing page aesthetic (font sizes, colors, spacing from the current `<p>` and `<h2>` elements).

---

## Phase 2: About Page Enhancement

### Target file
- `src/pages/about.astro`

### What to do

Expand the About page to include:

1. **"Who built this" section** (100-150 words) — Describe the team/person behind the site. Mention relevant experience (e.g., "built by a team with backgrounds in software engineering, data analysis, and web development"). Be specific about domain expertise where it exists.

2. **"Our approach to tool quality" section** (100-150 words) — Explain how tools are built: formulas sourced from published standards, edge cases tested, results shown alongside working. Name 2-3 specific standards (e.g., "BMI calculators use WHO thresholds", "currency conversions use ECB reference rates").

3. **"Privacy and data" section** (50-100 words) — Single paragraph on the client-side approach. Be factual, not promotional.

4. **External links** — Add 2-3 outbound links to authoritative sources that the site's tools reference (WHO, NIST, ISO, government agencies). Use `rel="noopener noreferrer"` and `target="_blank"`.

---

## Phase 3: Structured Data Enhancement

### Target files
- `src/layouts/ToolLayout.astro`
- `src/pages/category/[category].astro`

### What to do

**A. Add `author` and `publisher` to tool pages**

In `ToolLayout.astro`, add to the existing `structuredData` object:

```javascript
{
  "@type": "WebApplication",
  // ... existing fields ...
  "author": {
    "@type": "Organization",
    "name": "UtilifyGrid",
    "url": "https://utilifygrid.com/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "UtilifyGrid",
    "url": "https://utilifygrid.com/about"
  },
  "dateModified": "[current date in ISO 8601]"
}
```

**B. Add `BreadcrumbList` structured data**

Add a separate `<script type="application/ld+json">` block (or extend `structuredData`) with:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://utilifygrid.com" },
    { "@type": "ListItem", "position": 2, "name": "[Category]", "item": "https://utilifygrid.com/category/[slug]" },
    { "@type": "ListItem", "position": 3, "name": "[Tool Name]" }
  ]
}
```

**C. Add `AboutPage` structured data to `about.astro`**

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About UtilifyGrid",
  "url": "https://utilifygrid.com/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "UtilifyGrid",
    "url": "https://utilifygrid.com",
    "sameAs": []
  }
}
```

---

## Phase 4: Meta Description Improvement

### Target files
- `src/data/tools.json` (if meta descriptions are stored there)
- `src/layouts/ToolLayout.astro`
- `src/pages/category/[category].astro`

### What to do

Audit and rewrite meta descriptions to follow this pattern:

**Bad (current pattern):**
> "Free BMI Calculator – compute your body mass index instantly. Client-side, private, no sign-up."

**Good (new pattern):**
> "Enter your height and weight to get your BMI with WHO categories and healthy range guidance. Includes waist-to-hip ratio context."

Rules:
- Lead with the user's action or outcome, not the tool's features
- Include one specific detail that appears nowhere else on the page (a formula name, a standard, a threshold)
- 120-155 characters
- No "free", "no sign-up", "client-side", or "private" — these are table stakes, not differentiators
- Each description must be unique across the entire site

---

## Phase 5: Internal Linking Audit

### Target files
- `src/pages/tools/[TOOL-SLUG].astro` (existing v3 content slots)
- `src/pages/category/[category].astro`

### What to do

**A. Add 2-3 contextual internal links per tool page**

Within the existing v3 content slots (`how-to-use`, `how-it-works`, `faq`), add 2-3 hyperlinks to related tools or category pages. Rules:

- Links must be contextually relevant (e.g., a BMI calculator page linking to the Calorie Deficit Calculator)
- Use descriptive anchor text (not "click here" or "related tool")
- Spread across slots — don't cluster all links in one paragraph
- Maximum 3 links per tool page

**B. Add "Related tools" section to category pages**

Below the tools grid in `category.astro`, add a section with 3-5 links to specific tools in related categories. Example: The "Personal Finance" category page linking to the "Business Metrics" category's GST Calculator.

---

## Phase 6: Static Page Content Expansion

### Target files
- `src/pages/about.astro` (already covered in Phase 2)
- `src/pages/contact.astro`
- `src/pages/privacy-policy.astro`

### What to do

**A. Contact page** — Ensure it has:
- A brief "What we can help with" section (50-100 words)
- Response time expectation if applicable
- Specific contact method (form, email address)

**B. Privacy policy** — Ensure it covers:
- What data is collected (answer: none, if true)
- How tools process data (client-side processing)
- Third-party services used (AdSense, analytics if any)
- Cookie usage
- User rights

---

## Verification

After all changes, run `npx astro build` to verify:
- Build completes with 150 pages
- Zero compilation errors
- All new structured data validates (test with Google's Rich Results Test)

## Post-Edit

Update `seoclean-tooltracing.MD`:
- Mark Phase 1-6 completion in a new section
- Note any issues encountered

---

## Summary of what changed vs v3

| Aspect | v3 | v4 |
|--------|----|----|
| Focus | Individual tool content | Site-level quality signals |
| Category pages | Unchanged (thin) | Expanded editorial content |
| About page | Minimal | E-E-A-T signals, outbound links |
| Structured data | Basic WebApplication | BreadcrumbList, author, publisher |
| Meta descriptions | Generic | Unique, action-oriented |
| Internal linking | Ad-hoc | Systematic cross-linking |
| External links | None | 2-3 per page to authoritative sources |
| Tool content | Rewritten | Unchanged (v3 preserved) |
