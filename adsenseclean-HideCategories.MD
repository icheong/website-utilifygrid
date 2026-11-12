# Task: Temporarily Hide Non-Core Categories & Noindex Hidden Tool Pages for Google AdSense Review

I am preparing `utilifygrid.com` (Astro) for a Google AdSense review by temporarily hiding non-core categories and applying `noindex` tags without deleting existing code.

## 1. Category Visibility Scope
- **Keep Public (Active):** Web Tools, AI Web Tools, Text Processing (and optionally `maths-numbers`, `lexical-tools`, `randomizers` if they have substantial text).
- **Hide & Noindex (Paused):** Health Tools, Personal Finance, Business Metrics, Converters, PDF Tools.

## 2. Required Codebase Changes
- **Configuration:** Create a central list or flag (e.g., `HIDDEN_CATEGORIES`) for easy toggling post-approval.
- **UI & Navigation:** Filter hidden categories out of headers, footers, homepage category grids, search results, and popular tool sections. Dynamically update hero tool counts and adjust homepage copy to focus on developers, writers, and AI workflows.
- **SEO Meta Tags:** Update layout components (`BaseLayout.astro` / `ToolLayout.astro`) to inject `<meta name="robots" content="noindex, follow" />` into the `<head>` for hidden category/tool pages while keeping active pages set to `index, follow`.
- **Sitemap & Robots:** Exclude hidden category and tool URLs from the XML sitemap generation (`@astrojs/sitemap` or custom endpoint), ensuring `robots.txt` still allows crawling so Googlebot can read the `noindex` tag.

## 3. Verification Checklist
1. List all modified files.
2. Confirm `npm run build` passes with zero errors.
3. Provide example `<head>` output for active vs. hidden tools, and verify the sitemap excludes hidden URLs.
