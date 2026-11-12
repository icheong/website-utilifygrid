/**
 * Central toggle for categories that are temporarily hidden during the
 * Google AdSense review.
 *
 * - Hidden categories are filtered out of navigation, footers, homepage
 *   grids, search results and popular tool sections.
 * - Their category/tool pages still build, but emit
 *   `<meta name="robots" content="noindex, follow" />`.
 * - Their URLs are excluded from the XML sitemap (see astro.config.mjs).
 *
 * To restore a category after approval, remove its slug from this list.
 * Nothing else needs to change.
 */
export const HIDDEN_CATEGORIES = [
  'health',
  'personal-finance',
  'business-metrics',
  'converters',
  'pdf-tools',
];

/** True when a category slug is paused (hidden + noindex). */
export function isHiddenCategory(slug) {
  return HIDDEN_CATEGORIES.includes(slug);
}

/** True when a category slug is publicly listed. */
export function isVisibleCategory(slug) {
  return !isHiddenCategory(slug);
}

/** True when a tool belongs to a paused category. */
export function isHiddenTool(tool) {
  return isHiddenCategory(tool.category);
}

/** True when a tool belongs to a publicly listed category. */
export function isVisibleTool(tool) {
  return !isHiddenTool(tool);
}
