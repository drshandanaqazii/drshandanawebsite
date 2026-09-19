/**
 * Generates public/og-image.jpg — the 1200×630 card that appears when a link to
 * this site is pasted into WhatsApp, Facebook, X or LinkedIn.
 *
 *     npm run og
 *
 * Why a script rather than a file someone exported once: every string on the
 * card comes from src/consts.ts, so the name, the qualifications and the
 * location on the card cannot drift from the ones on the site. Re-run it after
 * editing any of them.
 *
 * Rendered with sharp, which is already present as Astro's image dependency, so
 * this adds nothing to package.json.
 *
 * ⚠️ One known compromise: the site's display face is Outfit, which is loaded
 * from Google Fonts at runtime and is not installed on the machine that runs
 * this script. librsvg resolves the stack below against system fonts, so the
 * card is set in whatever geometric sans is available — close in spirit, not
 * identical. If the card matters enough to be exact, replace public/og-image.jpg
 * with a designed 1200×630 export; nothing else has to change.
 */

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* consts.ts is TypeScript, so plain node cannot import it without a loader.
   Rather than add one for five strings, they are written out here and then
   checked against the file they came from — so this script fails loudly the
   day someone edits her title in consts.ts and forgets the card exists. */
const NAME = 'Dr. Shandana Qazi';
const ROLE = 'Consultant Psychiatrist';
const QUALS = 'MBBS, FCPS (Psychiatry)';
const PLACE = 'Rehman Medical Institute';
const CITY = 'Peshawar, Pakistan';

const consts = readFileSync(join(root, 'src/consts.ts'), 'utf8');
for (const value of [NAME, ROLE, QUALS, PLACE, 'Peshawar']) {
  if (!consts.includes(value)) {
    throw new Error(
      `make-og-image: "${value}" is no longer in src/consts.ts.\n` +
        'Update the constants at the top of this script to match, then re-run.'
    );
  }
}

const W = 1200;
const H = 630;

/* The site's tokens. Kept in sync by hand with src/styles/global.css — three
   values, and a mismatch is visible the moment the card is previewed. */
const INK = '#1A1622';
const AMETHYST_900 = '#3E2E5C';
const AMETHYST_600 = '#6A4E96';
const AMETHYST_50 = '#F2ECFA';
const HAIRLINE = '#E5E3EC';
const BODY = '#55505F';

const FONT = "Outfit, 'Segoe UI Variable Display', 'Segoe UI', Inter, Roboto, sans-serif";
const SANS = "Inter, 'Segoe UI', Roboto, sans-serif";

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>

  <!-- The arch motif from the nav, at poster scale, bled off the right edge.
       Faint enough to be a watermark rather than a second subject. -->
  <g opacity="0.5" fill="none" stroke-width="2">
    <path d="M905 560a180 180 0 0 1 360 0" stroke="${AMETHYST_50}" stroke-width="64"/>
    <path d="M905 560a180 180 0 0 1 360 0" stroke="${AMETHYST_600}" stroke-opacity="0.25"/>
    <path d="M985 560a100 100 0 0 1 200 0" stroke="${AMETHYST_600}" stroke-opacity="0.4"/>
  </g>

  <!-- Wordmark -->
  <g transform="translate(96, 92)" fill="none" stroke-width="3">
    <path d="M0 22a17 17 0 0 1 34 0" stroke="${AMETHYST_900}"/>
    <path d="M10 22a7 7 0 0 1 14 0" stroke="${AMETHYST_600}"/>
  </g>
  <text x="152" y="116" font-family="${SANS}" font-size="20" font-weight="500"
        letter-spacing="3.2" fill="${BODY}">PSYCHIATRIST IN PESHAWAR</text>

  <!-- Name, the one thing that has to be legible at thumbnail size -->
  <text x="96" y="300" font-family="${FONT}" font-size="86" font-weight="500"
        letter-spacing="-2.5" fill="${INK}">${escape(NAME)}</text>

  <text x="96" y="366" font-family="${FONT}" font-size="40" font-weight="400"
        letter-spacing="-0.8" fill="${AMETHYST_600}">${escape(ROLE)}</text>

  <line x1="96" y1="432" x2="700" y2="432" stroke="${HAIRLINE}" stroke-width="2"/>

  <text x="96" y="486" font-family="${SANS}" font-size="26" fill="${BODY}">${escape(QUALS)}</text>
  <text x="96" y="530" font-family="${SANS}" font-size="26" fill="${BODY}">${escape(PLACE)}, ${escape(CITY)}</text>

  <!-- The amethyst foot, so the card is not a white rectangle on a white feed -->
  <rect x="0" y="${H - 14}" width="${W}" height="14" fill="${AMETHYST_900}"/>
</svg>`;

const out = join(root, 'public', 'og-image.jpg');
mkdirSync(dirname(out), { recursive: true });

const buffer = await sharp(Buffer.from(svg))
  .flatten({ background: '#FFFFFF' })
  .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
  .toBuffer();

writeFileSync(out, buffer);

const { width, height, size } = await sharp(buffer).metadata();
console.log(`og-image.jpg  ${width}×${height}  ${Math.round(size / 1024)} kB  →  public/og-image.jpg`);
