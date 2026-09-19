# Dr. Shandana Qazi — practice site

Astro 5, static output, no client framework. Eighteen pages, built from the design system
in [`design/`](design/).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check && astro build → dist/
npm run preview
npm run og       # regenerate public/og-image.jpg from the facts in consts.ts
```

---

## ⚠️ Before this goes live

Everything below is a placeholder or an unverified value. All of it lives in
[`src/consts.ts`](src/consts.ts) — no facts are hard-coded into components.

| # | Item | Where | Why it matters |
|---|---|---|---|
| 1 | **Domain** — currently `https://drshandanaqazi.com` | `site.config.mjs` → `SITE_URL` | Canonical tags, Open Graph, the sitemap and every absolute URL in the JSON-LD derive from this one constant. Also update the `Sitemap:` line in `public/robots.txt`. |
| 2 | **Booking phone** — currently RMI's switchboard | `PRACTICE.bookingPhone` / `bookingPhoneDisplay` | This is the primary CTA on every page. Right now it dials the hospital, not her. |
| 3 | **WhatsApp number** — fake digits | `PRACTICE.whatsapp` | The WhatsApp buttons currently go nowhere useful. Digits only, country code, no `+`. |
| 4 | **OPD days & hours** — invented | `PRACTICE.hours` / `hoursDisplay` | These become `openingHoursSpecification` in the schema and the hours table on `/contact`. Google penalises hours that don't match reality. |
| 5 | **Consultation fee** | `FAQ_GROUPS` → "What does a consultation cost?" | Currently answered as "confirmed when you book". If RMI publishes a figure, give it — it is one of the most searched questions and a non-answer sends people elsewhere. |
| 6 | **Testimonials** — lorem ipsum | `TESTIMONIALS` | ⚠️ `<Testimonials />` **is live on the homepage** and is currently showing three lorem ipsum reviews attributed to "Placeholder name". Replace them with real, consented reviews, or remove the component from `src/pages/index.astro`, before launch. This is the most serious item on this list: invented reviews under a named doctor's byline are a medical-advertising problem, not just a content gap. |
| 7 | **Map coordinates** — approximate | `PRACTICE.geo` | Confirm against the pin on her Google Business Profile. Wrong coordinates actively hurt local ranking. |
| 8 | **Postcode** — assumed 25000 | `PRACTICE.address.postalCode` | Confirm. |
| 9 | **Languages** — assumed English/Urdu/Pashto | `DOCTOR.languages` | Near-certain, but it's a public claim, and `/contact` states it as fact. Confirm with her. |
| 10 | **Clinical review** | `src/data/services.ts` | The nine service pages are written to mainstream psychiatric practice, but they are published under a named consultant's byline. She should read them before launch. Once she has, add `lastReviewed` and `reviewedBy` to the `MedicalWebPage` node in `StructuredData.astro` — both are Google health-content signals, and neither can be added honestly until that has actually happened. |
| 11 | **`og-image.jpg`** | `npm run og` | Generated, present, and correct. It is set in a system font rather than Outfit, because the script rasterises without the webfont — if the card matters enough to be exact, replace it with a designed 1200×630 export. |
| 12 | **`/about` hero image** | `src/assets/about-hero-placeholder.jpg` | A generated dark ground, not a photograph. Replace with a wide (roughly 16:9) shot of her or the clinic and give `imageAlt` on `<MediaHeader>` real alt text — it is currently `""`, which is correct only while the image carries no information. |

Verified facts (from her [RMI consultant profile](https://rmi.edu.pk/consultants/dr-shandana-qazi/)):
MBBS Rehman Medical College 2018 · FCPS Psychiatry 2025 · Consultant Psychiatrist, RMI
Hayatabad · areas of expertise · Psychological First Aid certification · email · her stated
empathetic, culturally sensitive, evidence-based approach.

---

## Pages

```
/                                  homepage — every subject in short form, each linking on
/about                             training, approach, qualifications table
/services                        all nine, plus the three modalities
/services/<slug>                 ×9 — generated from src/data/services.ts
/faq                               sixteen questions in three groups
/contact                           NAP, hours, map, directions
/privacy-policy  /terms            legal
/404                               noindex
```

The nine service slugs: `depression` · `anxiety-and-panic` · `stress-and-burnout` ·
`sleep-problems` · `trauma-and-ptsd` · `womens-mental-health` · `ocd` · `psychosis` ·
`adolescent-mental-health`.

Adding a tenth service is one entry in [`src/data/services.ts`](src/data/services.ts).
It generates the page, joins `/services`, joins the footer, joins `knowsAbout` in the
schema, and becomes available as a `related` target — no other file is touched. Set
`featured: true` and it also takes a card on the homepage, which expects six.

---

## Photography

All images are Pexels stock (free for commercial use, no attribution required).

**No stock portrait of a woman appears anywhere near her name.** That would imply the
person in the photograph *is* Dr. Qazi, which is misrepresentation of an identifiable
person. The two portraits on the site are hers; everything else is either a client-chosen
photograph illustrating a condition, or an empty interior.

Every photograph, its alt text and its framing live together in
[`src/lib/service-images.ts`](src/lib/service-images.ts), so a picture cannot be
described one way on the homepage and another way on its service page.

| File | Used for |
|---|---|
| `shandana-portrait.png` | Hero — cut-out, stands on the tinted panel |
| `shandana-portrait2.jpeg` | The arch on the homepage About section and on `/about` |
| `service-*.jpg` ×6 | The six featured services |
| `still-vessels.jpg` · `hero-light.jpg` · `cta-morning.jpg` | OCD, psychosis and adolescent mental health, which have no photograph of their own |
| `about-plant.jpg` · `care-*.jpg` | Unused |

---

## SEO

Target queries: **"psychiatrist in Peshawar"**, variants on her name, and one
condition-plus-location query per service page ("depression treatment in Peshawar",
"OCD treatment in Peshawar", and so on).

**Built in:**

- `Physician` + `MedicalBusiness` JSON-LD — a `LocalBusiness` subtype, so `address`, `geo`,
  `areaServed` and `openingHoursSpecification` all count toward local ranking. Stable
  `@id`s mean the four practice nodes are the *same* entity across all eighteen pages
- `MedicalOrganization` node for RMI, linked as her `affiliation` and `worksFor`
- Per-page `WebPage` / `AboutPage` / `ContactPage` / `CollectionPage` / `MedicalWebPage`
- `MedicalCondition` + `BreadcrumbList` + `FAQPage` on every service page
- One `FAQPage` for the general questions, on `/faq` only — the same Q&A marked up on two
  URLs is a duplicate signal, not two chances at a rich result, which is why the homepage
  shows five of them and passes no `faqs` prop
- `hasCredential` for MBBS and FCPS, `alumniOf` Rehman Medical College
- `knowsAbout` listing every condition and its alternate names — 36 terms
- Canonical URL on every page, trailing slash stripped, matching the sitemap character for
  character
- Open Graph, Twitter cards, a real `og-image.jpg`, `geo.*` and `ICBM` meta
- `sitemap-index.xml` with priority by depth, `robots.txt`
- One `<h1>` per page, semantic `<h2>`/`<h3>`, `aria-labelledby` on every section,
  breadcrumbs in both markup and schema
- Descriptive alt text on every image
- Peshawar / Hayatabad / RMI worked into the copy naturally, not stuffed

**The site alone will not win the local pack.** Ranked roughly by impact:

1. **Google Business Profile.** Still the single biggest factor for "psychiatrist in
   Peshawar" — bigger than everything on this site combined. Claim it, verify it, set the
   category to *Psychiatrist*, add real hours and photos, and link it to the domain.
2. **Consistent NAP** (name, address, phone) everywhere — the site, GBP, Marham, oladoc,
   InstaCare, Healthwire, Apka Muaalij. Mismatched phone numbers across directories are the
   most common thing suppressing a local ranking in Pakistan. The block on `/contact` is
   the canonical version; copy it verbatim.
3. **Google Search Console** — verify the domain, submit the sitemap, then run the Rich
   Results Test on a service page to confirm the Physician, Breadcrumb and FAQ schema
   parse.
4. **Reviews on GBP.** Volume and recency both count.
5. **Her review of the service pages.** See item 10 above. Google's health guidelines
   weight content authored or reviewed by a named, credentialed clinician, and the schema
   cannot claim that until it is true.

---

## Structure

```
site.config.mjs            SITE_URL — the one place the domain lives
scripts/make-og-image.mjs  npm run og
src/
  consts.ts                every fact on the site, with ⚠️ markers on placeholders
  data/services.ts         the nine service pages, in full
  lib/
    icons.ts               the line-icon set (a .ts module — Astro can't export types)
    service-images.ts      photograph + alt text + framing, per service
    practice-links.ts      tel:, wa.me, mailto: and the two Google Maps URLs
  styles/global.css        design tokens, primitives, .rich, .checklist, .callout
  layouts/BaseLayout.astro <head>, meta, fonts, and the Nav/main/Footer shell
  components/
    StructuredData.astro   the per-page JSON-LD @graph
    Nav · Hero · CareModel · About · Services · Faq · Contact · Footer
    PageHeader · MediaHeader · Breadcrumbs · CtaBand · ServiceGrid · PracticeMap
    Icon · Button · Testimonials (not currently rendered — see item 6)
  pages/                   one file per route; services/[slug].astro generates nine
design/                    the design system this was built from
```

Component-specific CSS is scoped inside each `.astro` file. Only tokens and shared
primitives live in `global.css`.

## Notes on implementation

- **Every page shares one shell.** `BaseLayout` renders the nav, `<main>` and the footer;
  a page file contains only what goes inside `<main>`. Adding a page means adding one file.
- **Two page headers, and the text-led one is still the default.** `PageHeader` puts the
  `<h1>` first because a page that has to answer a search query wants that answer in its
  first line, not below a picture. `MediaHeader` is for the pages where the subject *is* the
  picture — currently only `/about`. Its notch is a real hole cut with a `mask`, not a white
  circle painted on top, so it survives the section below changing colour; where `mask` is
  unsupported the notch simply does not appear and the disc sits on the panel's edge.
- **No scroll entrance animations were easy.** Two implementations were tried and both left
  real sections invisible — an IntersectionObserver that didn't fire, and a CSS
  scroll-timeline that stranded elements at `opacity: 0` after an instant anchor jump. The
  current one is allowed to exist only because it cannot reproduce that: the hidden state is
  scoped to a JS-set flag, anything already on screen is revealed synchronously, and a
  scroll sweep backstops the observer. Keep all three. The reasoning is recorded in
  `global.css` and `motion.css` so it isn't reintroduced by accident.
- **The footer curtain is now conditional.** The footer is a four-column site map, and its
  height is also the gap the page has to scroll past. `motion.ts` measures it against the
  window and only sets `data-curtain` when it fits inside about three quarters of it; every
  rule that fixes it to the viewport is scoped to that flag. The same function publishes
  `--curtain` (0 → 1, how much of the footer is uncovered), which the footer's contents use
  to ride into place as it is exposed. Anything added to the footer has a layout cost — keep
  it compact.
- **Single-theme by design.** The page is white and amethyst is the only colour on it; every
  colour is painted explicitly rather than inherited. The two dark grounds — the footer and
  the CTA band — restate every text colour, because `.eyebrow` and `.prose` both vanish on
  amethyst.
- **A white surface on a white page needs an edge before a shadow.** Cards, the nav pill and
  the map panel set `inset 0 0 0 1px var(--hairline)` ahead of their shadow. Any rule that
  replaces `box-shadow` on hover has to restate the hairline.
- **Hover lift is `--lift`, never `transform`.** The reveal rules own `transform` on
  anything carrying `data-reveal` and compose `--lift` into it; a bare `transform` on hover
  is silently overwritten the moment the element reveals. See `.card` in `motion.css` and
  `.clist__item` in `ServiceGrid.astro`.
- **Emphasis is colour, not slant.** One `<em>` per display headline, rendered in
  `--amethyst-600`. Outfit has no true italic, so a slant would be synthesised.
- Fonts are Outfit + Inter from Google Fonts, both variable. Outfit is requested from weight
  200 because the ghost numerals in the care section set it there. Self-hosting both would
  remove a third-party request and is worth doing before launch if you want the last few LCP
  points.
