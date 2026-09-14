# Dr. Shandana Qazi — practice site

Astro 5, static output, no client framework. One page (`/`), built from the design system
in [`design/`](design/).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check && astro build → dist/
npm run preview
```

---

## ⚠️ Before this goes live

Everything below is a placeholder or an unverified value. All of it lives in
[`src/consts.ts`](src/consts.ts) — no facts are hard-coded into components.

| # | Item | Where | Why it matters |
|---|---|---|---|
| 1 | **Domain** — currently `https://drshandanaqazi.com` | `site.config.mjs` → `SITE_URL` | Canonical tags, Open Graph, sitemap and every absolute URL in the JSON-LD derive from this one constant. Also update the `Sitemap:` line in `public/robots.txt`. |
| 2 | **Booking phone** — currently RMI's switchboard | `PRACTICE.bookingPhone` / `bookingPhoneDisplay` | This is the primary CTA. Right now it dials the hospital, not her. |
| 3 | **WhatsApp number** — fake digits | `PRACTICE.whatsapp` | The WhatsApp button currently goes nowhere useful. Digits only, country code, no `+`. |
| 4 | **OPD days & hours** — invented | `PRACTICE.hours` / `hoursDisplay` | These become `openingHoursSpecification` in the schema. Google penalises hours that don't match reality. |
| 5 | **Testimonials** — lorem ipsum | `TESTIMONIALS` | Replace with real, consented reviews, or delete `<Testimonials />` from `src/pages/index.astro`. Do not ship the lorem. |
| 6 | **Her photograph** | `src/assets/about-plant.jpg` | See "Photography" below. |
| 7 | **`og-image.jpg`** — not created yet | `public/og-image.jpg` | 1200×630. Referenced by Open Graph, Twitter and the JSON-LD. Currently 404s, so link previews will be blank. |
| 8 | **Map coordinates** — approximate | `PRACTICE.geo` | Confirm against the pin on her Google Business Profile. Wrong coordinates actively hurt local ranking. |
| 9 | **Postcode** — assumed 25000 | `PRACTICE.address.postalCode` | Confirm. |
| 10 | **Languages** — assumed English/Urdu/Pashto | `DOCTOR.languages` | Near-certain, but it's a public claim. Confirm with her. |

Verified facts (from her [RMI consultant profile](https://rmi.edu.pk/consultants/dr-shandana-qazi/)):
MBBS Rehman Medical College 2018 · FCPS Psychiatry 2025 · Consultant Psychiatrist, RMI
Hayatabad · areas of expertise · Psychological First Aid certification · email · her stated
empathetic, culturally sensitive, evidence-based approach.

---

## Photography

All images are Pexels stock (free for commercial use, no attribution required).

**Every photo was chosen specifically to avoid showing a face.** A stock portrait of a woman
placed next to a real, named doctor implies that person *is* Dr. Qazi. That is
misrepresentation of an identifiable person, so the site uses atmospheric imagery instead —
light, interiors, hands, objects.

The arch-cropped image in the About section is the slot her real professional portrait
belongs in. Replace `src/assets/about-plant.jpg` with a portrait-orientation photograph of
her and update the `alt` text in `src/components/About.astro`.

| File | Used for |
|---|---|
| `hero-light.jpg` | Hero |
| `about-plant.jpg` | About — **placeholder for her portrait** |
| `still-vessels.jpg` | Arch medallion above the recognition block |
| `care-evaluation.jpg` · `care-medication.jpg` · `care-therapy.jpg` | The three treatment cards |
| `cta-morning.jpg` | Unused — the booking section now carries a Google Maps embed |

---

## SEO

Target query: **"psychiatrist in Peshawar"** and variants on her name.

**Built in:**

- `Physician` + `MedicalBusiness` JSON-LD — a `LocalBusiness` subtype, so `address`, `geo`,
  `areaServed` and `openingHoursSpecification` all count toward local ranking
- `MedicalOrganization` node for RMI, linked as her `affiliation` and `worksFor`
- `FAQPage` schema on the six questions — eligible for FAQ rich results
- `WebSite` + `WebPage` nodes, all cross-referenced by `@id`
- `hasCredential` for MBBS and FCPS, `alumniOf` Rehman Medical College
- `knowsAbout` listing all twelve conditions treated
- Canonical URL, Open Graph, Twitter cards, `geo.*` and `ICBM` meta
- `sitemap-index.xml` via `@astrojs/sitemap`, `robots.txt`
- One `<h1>`, semantic `<h2>`/`<h3>` hierarchy, `aria-labelledby` on every section
- Descriptive alt text on every image
- Peshawar / Hayatabad / RMI worked into the copy naturally, not stuffed

**The site alone will not win the local pack.** Ranked roughly by impact:

1. **Google Business Profile.** This is the single biggest factor for "psychiatrist in
   Peshawar" — bigger than everything on this site combined. Claim it, verify it, set the
   category to *Psychiatrist*, add real hours and photos, and link it to the domain. Without
   this, the map results are simply out of reach.
2. **Consistent NAP** (name, address, phone) everywhere — the site, GBP, Marham, oladoc,
   InstaCare, Healthwire, Apka Muaalij. Mismatched phone numbers across directories are the
   most common thing suppressing a local ranking in Pakistan.
3. **Google Search Console** — verify the domain, submit the sitemap, then use the
   Rich Results Test on the live URL to confirm the Physician and FAQ schema parse.
4. **Reviews on GBP.** Volume and recency both count.
5. **Content over time.** The homepage ranks for her name; ranking for *conditions*
   ("depression treatment Peshawar") needs a page per condition. That is the obvious next
   build, and the components are already reusable for it.

---

## Structure

```
site.config.mjs            SITE_URL — the one place the domain lives
src/
  consts.ts                every fact on the site, with ⚠️ markers on placeholders
  lib/icons.ts             the line-icon set (a .ts module — Astro can't export types)
  styles/global.css        design tokens + shared primitives
  layouts/BaseLayout.astro <head>, meta, Open Graph, fonts
  components/
    StructuredData.astro   the JSON-LD @graph
    Nav · Hero · Recognition · CareModel · About
    Testimonials · Faq · Contact · Footer
    Icon · Button
  pages/index.astro        section order
design/                    the design system this was built from
```

Component-specific CSS is scoped inside each `.astro` file. Only tokens and shared
primitives live in `global.css`.

## Notes on implementation

- **No scroll entrance animations.** Two implementations were tried and both left real
  sections invisible — an IntersectionObserver that didn't fire, and a CSS scroll-timeline
  that stranded elements at `opacity: 0` after an instant anchor jump. Since every nav link
  is an anchor, "Questions" landing on a blank FAQ was a worse outcome than a missing fade.
  The reasoning is recorded in `global.css` so it isn't reintroduced by accident.
- **Single-theme by design.** The page is white and amethyst is the only colour on it; every
  colour is painted explicitly rather than inherited.
- **A white surface on a white page needs an edge before a shadow.** Cards, the nav pill and
  the map panel set `inset 0 0 0 1px var(--hairline)` ahead of their shadow. Any rule that
  replaces `box-shadow` on hover has to restate the hairline — see the two notes in
  `motion.css`, which is where that has already bitten once.
- **Emphasis is colour, not slant.** One `<em>` per display headline, rendered in
  `--amethyst-600`. Outfit has no true italic, so a slant would be synthesised.
- Fonts are Outfit + Inter from Google Fonts, both variable. Outfit is requested from weight
  200 because the ghost numerals in the care section set it there. Self-hosting both would
  remove a third-party request and is worth doing before launch if you want the last few LCP
  points.
