import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import partytown from '@astrojs/partytown';

import sitemap from '@astrojs/sitemap';

import { isHiddenCategory } from './src/data/hiddenCategories.js';

/* Hidden (noindexed) categories are kept out of the sitemap — see src/data/hiddenCategories.js */
const tools = JSON.parse(readFileSync(new URL('./src/data/tools.json', import.meta.url), 'utf8'));
const hiddenToolSlugs = new Set(
  tools.filter(tool => isHiddenCategory(tool.category)).map(tool => tool.slug)
);

function includeInSitemap(page) {
  let pathname;
  try {
    pathname = new URL(page).pathname;
  } catch {
    pathname = page;
  }
  const category = pathname.match(/^\/category\/([^/]+)\/?$/);
  if (category) return !isHiddenCategory(decodeURIComponent(category[1]));
  const tool = pathname.match(/^\/tools\/([^/]+)\/?$/);
  if (tool) return !hiddenToolSlugs.has(decodeURIComponent(tool[1]));
  return true;
}

export default defineConfig({
  site: 'https://utilifygrid.com',

  vite: {
    plugins: [tailwindcss()],
  },

  output: 'static',
  integrations: [partytown(), sitemap({ filter: includeInSitemap })],
});
