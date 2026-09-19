// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { SITE_URL } from './site.config.mjs';

/**
 * Sitemap priority, by depth.
 *
 * Priority is a weak signal and a flat 1.0 on every URL is the same as no
 * signal at all — it tells a crawler that the privacy policy matters as much as
 * the homepage. These say what is actually true of this site: the homepage and
 * the service pages are what it exists to rank, and the legal pages are there
 * because they have to be.
 */
const PRIORITY = [
  [/\/(privacy-policy|terms)$/, 0.3, 'yearly'],
  [/\/services\/[^/]+$/, 0.8, 'monthly'],
  [/\/(about|services|treatment|faq|contact|appointments)$/, 0.9, 'monthly'],
];

// https://astro.build/config
export default defineConfig({
  // Drives canonical URLs, the sitemap, and every absolute URL in the JSON-LD.
  // Change it in ONE place: site.config.mjs
  site: SITE_URL,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // 404 is noindex, so listing it in the sitemap would be a contradiction.
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname.replace(/\/$/, '');
        const match = PRIORITY.find(([pattern]) => pattern.test(path));

        return {
          ...item,
          // Trailing slash stripped so a sitemap entry is character-for-character
          // the URL in that page's own <link rel="canonical">. The build writes
          // /about/index.html either way; this is only about the two of them
          // naming the page identically. The root keeps its slash — there is no
          // shorter form of an origin.
          url: path ? `${url.origin}${path}` : item.url,
          lastmod: new Date().toISOString(),
          priority: match ? match[1] : 1.0,
          changefreq: match ? match[2] : 'monthly',
        };
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
