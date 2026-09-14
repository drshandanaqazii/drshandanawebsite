# Design System — Dr. Shandana

**Derived from** the Balancia counseling reference; **not a copy of it.** We keep the
structural DNA — the arch, generous air, one-word emphasis in a display line, hairline
lists — and replace the palette, the type, the imagery approach and the voice with our own.

**Adapted for psychiatry:** same softness, plus real credibility signals. A psychiatrist
diagnoses and prescribes. The design has to feel human *and* qualified, in that order.

---

## 1. What we kept, what we changed

| | Reference | Ours |
|---|---|---|
| Paper | warm cream `#FAF5EF` | **white** `#FFFFFF` — no tint anywhere on the page |
| Hard color | aubergine `#2B1D33` | **amethyst** `#3E2E5C` — contemplative, and still 11:1 credible |
| Wash | mint + apricot | **none** — the ambient wash was removed; the page is white |
| Imagery | flat pastel illustration | **photography + line icons** |
| Voice | counseling-center warmth | same warmth + credentials, conditions, care model |
| Section order | reference sequence | ours (defined separately) |
| Type | licensed display serif + sans | **Outfit only** — no serif in the system at all |
| **Kept** | one-word emphasis · the arch · pill nav · hairline lists · near-zero shadow · 3-beat section rhythm | |

---

## 2. Core principles

1. **White page, and mean it.** No wash, no tint, no cream. Cards are white too — they are
   separated by a hairline, not by a change of ground.
2. **Weight says the feeling, size says the rank.** Emotional lines are large Outfit at
   weight 300. Explanatory lines are small Inter at 1.7 leading. One family, two volumes.
3. **One emphasised word per headline, in amethyst.** This is the whole personality in one
   gesture — use it, but only once per line, and never with a slant.
4. **Center-axis storytelling.** Narrative sections are centered and capped at 640px, so the
   page reads like a letter rather than a brochure.
5. **The arch.** Round top, flat bottom, on every portrait. It is the brand shape.
6. **Air over ornament.** 120–160px between sections. Dividers are hairlines, never boxes.
7. **Credibility is quiet.** Credentials appear as small tracked labels and hairline rows,
   never as badges, seals, or shields. Authority through restraint.
8. **Three-beat rhythm:** micro-label → display headline → one calm Inter subline.

---

## 3. Color

**The page is white.** Not cream, not bone, not tinted — `#FFFFFF`, with no ambient wash of
any kind. Amethyst is the only colour on it, which is what lets a single deep violet carry
the whole brand: the less there is around it, the more it means.

Three surfaces are allowed not to be white, and there is a reason for each: the alternating
band (a change of subject), the footer (the closing anchor), and the panel behind the
cut-out portrait (without it the white coat has no background).

### Foundation
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | page canvas |
| `--paper-deep` | `#F5F4F8` | alternating band; head of the hero panel |
| `--surface` | `#FFFFFF` | cards, nav pill, accordion rows |
| `--hairline` | `#E5E3EC` | 1px dividers, card edges, list rows |

### Ink
Faintly violet-shifted so it belongs to the amethyst rather than fighting it — but only
faintly: on white, a warm grey reads as a printing error.

| Token | Hex | On white | Use |
|---|---|---|---|
| `--ink` | `#1A1622` | 16.6:1 | headlines, display type |
| `--ink-body` | `#55505F` | 7.8:1 | paragraphs |
| `--ink-muted` | `#6B6577` | 5.6:1 | micro-labels, meta, captions |

> `--ink-muted` is deliberately dark. Micro-labels are 10.5px — they need the contrast.
> Never lighten it.

### Amethyst — the only colour on the page
| Token | Hex | Use |
|---|---|---|
| `--amethyst-900` | `#3E2E5C` | buttons, arrow circles, links, footer ground (12:1 on white) |
| `--amethyst-800` | `#4B3970` | reserved second step |
| `--amethyst-600` | `#6A4E96` | hover / pressed / focus ring / headline emphasis (6.7:1) |
| `--amethyst-100` | `#E7E0F4` | foot of the hero panel, drawn progress |
| `--amethyst-50` | `#F2ECFA` | chips, icon discs, selected states |

### Gilt — one warm mark
| Token | Hex | Use |
|---|---|---|
| `--gilt-600` | `#A9762F` | the ghost numerals and the quote mark. Nothing else. |

> Gilt is 4:1 on white. Large type and marks only — **never** a text colour, never a fill.

### Rules
- Amethyst is the **only** colour that ever fills a UI element. Gilt marks; it never fills.
  Everything else is white, ink, or hairline.
- No red, no "alert" colour anywhere in marketing UI. The one exception is the
  crisis notice (§6), which uses ink on `--paper-deep` — urgent through placement, not hue.
- **A white surface on a white page needs an edge before it needs a shadow.** Cards, the nav
  pill and the map panel all set `inset 0 0 0 1px var(--hairline)` *ahead* of their shadow —
  and any rule that replaces `box-shadow` on hover (see `motion.css`) has to restate it, or
  the edge disappears mid-interaction.
- No gradients on type, buttons, or cards. The hero panel is the only gradient on the site.
- Shadows are soft and near-black at very low alpha. On white there is no tonal step for a
  shadow to sit in, so a heavy one just looks like dirt.

---

## 4. Typography

### Families
```css
--font-display: "Outfit", -apple-system, "Segoe UI", Roboto, sans-serif;
--font-sans:    "Inter",  -apple-system, "Segoe UI", Roboto, sans-serif;
```

**There is no serif in this system.** The serif/sans split is gone; the page's character
comes from weight, size and white space instead.

**Outfit** sets every display line. It is geometric, wide-open and even in colour, and — the
reason it is here — it holds up at weight 300 across a 76px headline, where a grotesque would
go spindly and a humanist would go generic. Anything above `display-md` runs light.

**Inter** carries all functional text: body copy, labels, credentials, buttons, nav.

Both are variable and load from Google Fonts. The request in `BaseLayout.astro` asks for
Outfit from **200**, because the ghost numerals in the care section set it there; trimming
the low end of that range silently thickens both them and the display steps.

### Scale (fluid, mobile → desktop)
Weight climbs as size falls. That inversion is the whole hierarchy in a single-family system:
a 76px line at 300 and a 20px line at 500 read as the same voice at two volumes.

| Token | Size | Line height | Tracking | Weight | Family |
|---|---|---|---|---|---|
| `display-xl` — hero | 40 → 76px | 1.08 | **-0.03em** | 300 | Outfit |
| `display-lg` — section head | 34 → 56px | 1.12 | **-0.03em** | 300 | Outfit |
| `display-md` | 28 → 40px | 1.18 | -0.02em | 400 | Outfit |
| `card-title` | 19 → 22px | 1.32 | -0.01em | 500 | Outfit |
| `eyebrow-serif` | 17 → 20px | 1.45 | 0 | 400 | Outfit |
| `body` | 16px | 1.70 | 0 | 400 | Inter |
| `body-sm` | 14px | 1.65 | 0 | 400 | Inter |
| `label` — micro caps | 10.5px | 1.40 | **0.18em** | 500, UPPERCASE | Inter |
| `credential` | 12px | 1.4 | 0.08em | 500, UPPERCASE | Inter |

> `eyebrow-serif` keeps its name for now — it is the serif-era class that the components
> still reference, and renaming it touches every section for no visual gain. It sets Outfit
> like everything else.

### Rules
- Display type runs **300 above `display-md`**, and is never bolded past 500 anywhere.
- A geometric sans needs real negative tracking at display size — hence `-0.03em` on the two
  largest steps, and a separate, gentler value on the card step where the same figure would
  close the counters.
- **Emphasis is colour, not slant.** `<em>` inside a display heading renders roman in
  `--amethyst-600`; one word per headline, maximum. Outfit has no true italic, and a
  synthesised slant is the one thing that would cheapen the whole page.
- `label` is the workhorse: it sits above headlines and beneath section titles.
- `credential` is new for this project — used for "MD · Board-Certified Psychiatrist",
  license lines, and years-in-practice. Slightly larger and less tracked than `label` so it
  reads as fact rather than decoration.
- Centered blocks cap at 640px. Left-aligned body caps at 58ch.

---

## 5. Space, layout, shape

```
--space: 4 8 12 16 24 32 48 64 80 120 160 (px)
--container:        1200px
--container-narrow:  640px
--gutter:            24px
--section-y:  clamp(80px, 9vw, 140px)

--r-pill: 999px          /* nav, buttons, tags */
--r-card: 20px
--r-media: 14px          /* image inside a card */
--r-hero: 24px
--r-arch: 999px 999px 0 0

--shadow-sm:   0 1px 2px  rgba(62,46,92,.04)
--shadow-card: 0 8px 28px rgba(62,46,92,.06)
--shadow-nav:  0 6px 24px rgba(62,46,92,.08)
```

Grids: 12-column. Cards 3-up (services, testimonials, articles) or 4-up (benefit items).
Conditions-treated is a 2-column hairline list, not cards.

Depth is *barely there*. If a shadow reads as a shadow, it is too strong.

---

## 6. Components

### Carried over from the reference
**Nav** — floating white pill, 64px tall, `--r-pill`, 16px from top, sticky. Links with
caret dropdowns left, wordmark centered, amethyst CTA pill right.

**Primary button** — amethyst pill, white 14px sans label, `padding: 10px 10px 10px 26px`,
with a 32px white circle holding an amethyst arrow flush right. Hover: `--amethyst-600`,
arrow rotates 45°.

**Circular icon button** — 40px amethyst circle, white arrow.

**Arch medallion** — 96×112px portrait, `--r-arch`, 6px paper ring, centered above a
statement block as a section opener.

**Statement block** — `eyebrow-serif` → `display-lg` with one amethyst word → `label` or one
Inter subline. Centered, 640px.

**Hairline row** — full width, `padding-block: 22px`, `border-bottom: 1px solid
var(--hairline)`. Used for conditions treated and FAQ (FAQ adds a `+` rotating to `×`).

**Card** — white, `--r-card`, 24px padding, `--shadow-card`. Photo panel at top in
`--r-media`, `card-title` at 500, 14px body, circular arrow button. White on white, so the
hairline edge is not optional.

**Testimonial card** — white, `--r-card`, `label`-style attribution.

**Footer** — full-bleed `--amethyst-900`, rounded at the top corners, fixed behind the page
as a curtain. **Centred, in three groups:** identity (mark, name, credentials) → links and
contact, each as one horizontal row → hairline → legal line. The groups are separated by
space, not by rules; there is exactly one rule in the footer and it sits above the legal
line.

Two things that are not style preferences and should not be undone:

- Every text tone is a **solid colour**, never white at an opacity. Stacked alphas
  (`.6`–`.82`) on a purple ground are what made the first version read as washed out.
  Nothing is below 7:1.
- Nav links go in **one wrapping row, never a stacked list**. Centred, a five-item vertical
  ladder is what made the first version read as a pile.
- The credentials and the job title are two flex items, not a string joined by a middot: a
  joined string breaks after the separator and leaves the dot hanging at a line end.

### New — the credibility layer
**Credential bar** — a hairline-bounded row directly under the hero. 3–4 items in
`credential` type separated by thin vertical rules: `MD` · `BOARD-CERTIFIED PSYCHIATRIST` ·
`LICENSED IN [STATE]` · `12 YEARS IN PRACTICE`. No icons, no badges. Restraint *is* the
authority signal.

**Care-model block** — explains diagnosis, medication management, and therapy coordination
in plain language. Two or three hairline rows, each: `label` (e.g. "MEDICATION MANAGEMENT")
→ `card-title` → one sentence of body. This is the section that separates a psychiatrist
from a counselor; it must be legible and unhedged.

**What-to-expect steps** — numbered 3-up. Number in `display-md` at `--gilt-600`,
title in `card-title`, one line of body. No connector lines, no timeline graphic.

**Insurance strip** — accepted-insurer marks at `opacity: .5`, grayscale, in a
hairline-bounded row. Functional, not social proof — label it "Insurance accepted".

**Crisis notice** — a `--paper-deep` band, hairline top and bottom, `label` heading plus one
line of `body-sm` with 988 / local emergency guidance. Placed in the footer region. Uses no
alert color; it earns attention through isolation and whitespace.

**Bio block** — arch portrait left, name in `display-md`, `credential` line beneath, body
copy, then a hairline list of training and affiliations in `body-sm`.

---

## 7. Imagery

**Photography only** — no illustration in this build.

- Natural window light. Neutral wardrobe: white, oat, plum, charcoal.
- Real clinical and consultation settings, softly out of focus behind the subject.
- Subject mid-conversation or mid-thought — never posed-smiling stock, never a stethoscope,
  never crossed arms in a white coat.
- **Grade:** slight desaturation, lifted blacks, warm-neutral white balance. Every photo
  should look like it was shot in the same room on the same afternoon.
- **Two crops only:** the **arch** (portraits, medallions) and the **soft-rounded
  rectangle** `--r-media` / `--r-hero` (everything else).

**Line icons** — replacing the reference's illustrations.

- 1.25px stroke, round caps and joins, 24 / 32 / 72px sizes.
- `--ink` on white, or `--amethyst-900` inside a `--amethyst-50` circle at 72px.
- Geometric and calm — no filled shapes, no duotone, no decorative flourishes.
- One consistent set across the whole site. Never mix icon families.

---

## 8. Motion

`--ease: cubic-bezier(.2,.7,.2,1)` · `--dur: 400ms`

Section entrances: fade plus 16px rise, staggered 60ms. Hover changes color or transform
only, never scale past 1.02. Nothing bounces. Full `prefers-reduced-motion` support.

---

## 9. Accessibility floor

- Body and label text clear 4.5:1 on white; the tokens above are already checked, as are
  the footer tones on `--amethyst-900`.
- Never signal anything by color alone.
- Focus ring: `outline: 2px solid var(--amethyst-600); outline-offset: 3px` — visible on
  paper, white, and amethyst surfaces.
- Minimum touch target 44×44px, including the nav caret dropdowns.
- Display type at weight 300 needs size to stay legible: never below 28px. Below that, use
  `card-title` at 500 instead of shrinking a light line.
