# 🧰 ToolBox — Client-Side Tool Library

A scalable, SEO-optimised static tool library built with **Astro + Tailwind CSS**, deployed on **Cloudflare Pages**.

---

## Quick Start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview build locally
```

---

## Project Structure

```
src/
├── data/
│   ├── tools.json          ← SINGLE SOURCE OF TRUTH for all tools
│   └── categories.json     ← Category definitions
├── layouts/
│   ├── BaseLayout.astro    ← HTML shell, nav, footer, AdSense
│   └── ToolLayout.astro    ← 3-column tool page with ads + related tools
├── pages/
│   ├── index.astro         ← Homepage with search + filter
│   ├── privacy-policy.astro
│   ├── about.astro         ← Create this (required for AdSense)
│   ├── contact.astro       ← Create this (required for AdSense)
│   ├── category/
│   │   └── [category].astro  ← Auto-generates /category/calculators etc.
│   └── tools/
│       └── bmi-calculator.astro  ← Example tool page
public/
├── _headers                ← Cloudflare cache + security headers
├── _redirects              ← Cloudflare URL redirects
└── robots.txt
```

---

## Adding a New Tool (3 steps)

### Step 1 — Add to tools.json

```json
{
  "slug": "my-new-tool",
  "name": "My New Tool",
  "category": "calculators",
  "tags": ["keyword1", "keyword2", "keyword3"],
  "description": "Full description for SEO meta tag and structured data. 1–2 sentences.",
  "shortDescription": "Short tagline for cards. Under 10 words.",
  "icon": "🔢",
  "dateAdded": "2025-03-01",
  "featured": false
}
```

**That's it for the homepage, category page, sitemap, related tools, and structured data.**

### Step 2 — Create the tool page

Create `src/pages/tools/my-new-tool.astro`:

```astro
---
import ToolLayout from '../../layouts/ToolLayout.astro';
import tools from '../../data/tools.json';

const tool = tools.find(t => t.slug === 'my-new-tool')!;
---

<ToolLayout tool={tool}>

  <!-- Required: the interactive tool UI -->
  <div slot="tool">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Tool Title</h2>
    <!-- Your inputs, buttons, result display -->
  </div>

  <!-- Required for SEO: how to use -->
  <div slot="how-to-use">
    <h2 class="text-xl font-bold text-gray-900 mb-3">How to use this tool</h2>
    <p>...</p>
  </div>

  <!-- Required for SEO: explanation -->
  <div slot="how-it-works">
    <h2 class="text-xl font-bold text-gray-900 mb-3">How it works</h2>
    <p>...</p>
  </div>

  <!-- Required for SEO: FAQ (featured snippets) -->
  <div slot="faq">
    <h2 class="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
    <!-- Use the FAQ schema pattern from bmi-calculator.astro -->
  </div>

</ToolLayout>

<script>
  // Tool logic here — runs client-side
</script>
```

### Step 3 — Done

Run `npm run build`. The tool appears on the homepage, its category page, in search, the sitemap, and related tools automatically.

---

## AdSense Setup

1. Replace `ca-pub-XXXXXXXXXXXXXXXX` in `BaseLayout.astro` and `ToolLayout.astro` with your publisher ID
2. Replace the `data-ad-slot` values with your actual ad unit IDs from AdSense
3. Ad slots are positioned for maximum RPM without policy violations:
   - **Leaderboard** below header (not above fold on mobile)
   - **300×250** right sidebar — highest RPM unit
   - **Post-result** responsive ad — highest CTR position
   - **Between content and related tools** — natural break
   - **Second 300×250** lower sidebar

---

## Before Applying for AdSense

- [ ] Replace `yoursite.com` everywhere with your real domain
- [ ] Create `/about` page with genuine content
- [ ] Create `/contact` page with a working form or email
- [ ] Have at least 20–30 tool pages with complete content
- [ ] Ensure every tool page has `how-to-use`, `how-it-works`, and `faq` slots filled
- [ ] Verify privacy policy mentions Google AdSense cookies

---

## Cloudflare Pages Deployment

1. Push repo to GitHub
2. Go to Cloudflare Pages → Create application → Connect to Git
3. Set build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Set environment variables if needed
5. Deploy — every push to `main` auto-deploys

---

## SEO Checklist (per tool page)

- [ ] Unique `<title>` with tool name + site name
- [ ] Unique `<meta description>` 150–160 chars
- [ ] Canonical URL set
- [ ] `WebApplication` structured data
- [ ] `FAQPage` structured data in FAQ slot
- [ ] `BreadcrumbList` structured data (automatic via ToolLayout)
- [ ] Breadcrumb navigation visible
- [ ] One `<h1>` (tool name)
- [ ] `<h2>` headings: How to use, How it works, FAQ
- [ ] 150+ words of surrounding content (not just the tool)
- [ ] Related tools linked

---

## Adding a New Category

1. Add to `src/data/categories.json`
2. The category page at `/category/your-slug` generates automatically
3. Add tools with `"category": "your-slug"` in `tools.json`
