/**
 * The two values that have to be identical in the Astro config and in the
 * page's structured data. Plain .mjs so both can import it without any
 * TypeScript resolution guesswork.
 *
 * ⚠️  CHANGE THIS WHEN THE DOMAIN IS REGISTERED — it is the only place the
 *     origin appears. Canonical tags, Open Graph, the sitemap and every
 *     absolute URL in the JSON-LD all derive from it.
 */
export const SITE_URL = 'https://drshandanaqazi.com';

/** Used for <html lang> and the og:locale tag. */
export const SITE_LOCALE = 'en_PK';
