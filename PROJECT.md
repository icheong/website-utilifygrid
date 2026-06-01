# UtilifyGrid — Project Context

## Stack
- **Astro 4** (static output) + **Tailwind v4** via `@tailwindcss/vite`
- Deployed on **Cloudflare Pages** from GitHub
- Build: `npm run build` → `dist/`

## Key files
| File | Purpose |
|---|---|
| `src/data/tools.json` | Single source of truth — every tool card, sitemap entry, related tools |
| `src/data/categories.json` | Category list used in nav, homepage, category pages |
| `src/layouts/BaseLayout.astro` | HTML shell, header, footer, AdSense, dark/light theme toggle |
| `src/layouts/ToolLayout.astro` | 3-column tool page: left sidebar, main content, right sidebar + ads |
| `src/styles/global.css` | Tailwind v4 import, CSS variables for light/dark theme |

## Theme system
- CSS vars on `:root` (light) and `:root.dark` (dark)
- Key vars: `--bg-page`, `--bg-surface`, `--bg-surface-2`, `--bg-surface-3`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border`, `--shadow-card`
- Anti-flash inline script in `<head>` reads `localStorage('ug-theme')`
- Toggle button in header writes preference back to localStorage

## Tool page pattern
Every tool page lives at `src/pages/tools/[slug].astro` and follows this structure:
```astro
---
import ToolLayout from '../../layouts/ToolLayout.astro';
import tools from '../../data/tools.json';
const tool = tools.find(t => t.slug === 'my-slug')!;
---
<ToolLayout tool={tool}>
  <div slot="tool">        <!-- interactive UI --> </div>
  <div slot="how-to-use"> <!-- 2-3 paragraphs  --> </div>
  <div slot="how-it-works"><!-- formulas/method --> </div>
  <div slot="faq">         <!-- 5-6 Q&A with FAQPage schema --> </div>
</ToolLayout>
<script> /* client-side logic */ </script>
```

## tools.json entry shape
```json
{
  "slug": "tool-slug",
  "name": "Tool Name",
  "category": "web-tools",
  "tags": ["tag1", "tag2"],
  "description": "Full sentence for SEO meta (~150 chars).",
  "shortDescription": "Short tagline for cards.",
  "icon": "🔧",
  "dateAdded": "2025-01-15",
  "featured": false
}
```

## Categories
| slug | name |
|---|---|
| `calculators` | Calculators |
| `converters` | Converters |
| `health` | Health Tools |
| `web-tools` | Web Tools |
| `estimators` | Estimators |

## Styling rules
- All inline styles use CSS vars (`var(--text-primary)` etc.) — never hardcode `#0F172A` or `#fff`
- Tool workspace sits inside `.tool-card-surface` (themed card)
- SEO sections use `.seo-section` and `.seo-section-alt`
- Inputs/selects/textareas use `.ctrl-select` or `input-themed` class
- Monospace output: `font-family:'Fira Code',monospace`
- Display headings: `font-family:'Sora',sans-serif`

## Current tools
| slug | category |
|---|---|
| bmi-calculator | health |
| hex-to-rgb | converters |
| percentage-calculator | calculators |
| word-counter | web-tools |
| jwt-debugger | web-tools |
| css-flexbox-grid-sandbox | web-tools |
| json-to-typescript | web-tools |

## AdSense
- Publisher ID placeholder: `ca-pub-XXXXXXXXXXXXXXXX`
- Slots in BaseLayout (leaderboard) and ToolLayout (skyscraper, 2× 300×250, post-result)

## Adding a new tool — checklist
1. Add entry to `src/data/tools.json`
2. Create `src/pages/tools/[slug].astro`
3. Run `npm run build` to verify
