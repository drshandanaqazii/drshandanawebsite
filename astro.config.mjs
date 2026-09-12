// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { SITE_URL } from './site.config.mjs';

// https://astro.build/config
export default defineConfig({
  // Drives canonical URLs, the sitemap, and every absolute URL in the JSON-LD.
  // Change it in ONE place: site.config.mjs
  site: SITE_URL,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'monthly',
      priority: 1.0,
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
