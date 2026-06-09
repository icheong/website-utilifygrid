import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import partytown from '@astrojs/partytown';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://utilifygrid.com',

  vite: {
    plugins: [tailwindcss()],
  },

  output: 'static',
  integrations: [partytown(), sitemap()],
});