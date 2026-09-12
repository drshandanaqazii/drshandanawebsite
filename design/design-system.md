# Design System — Dr. Shandana

**Derived from** the Balancia counseling reference; **not a copy of it.** We keep the
structural DNA — warm paper, serif/sans split, the arch, generous air, italic-word emphasis
— and replace the palette, the imagery approach, and the voice with our own.

**Adapted for psychiatry:** same softness, plus real credibility signals. A psychiatrist
diagnoses and prescribes. The design has to feel human *and* qualified, in that order.

---

## 1. What we kept, what we changed

| | Reference | Ours |
|---|---|---|
| Paper | warm cream `#FAF5EF` | **bone** `#F6F3EE` — cooler, less peach, less "spa" |
| Hard color | aubergine `#2B1D33` | **evergreen** `#1F3A34` — calm but clinically credible |
| Wash | mint + apricot | **sage + sand** — quieter, near-neutral |
| Imagery | flat pastel illustration | **photography + line icons** |
| Voice | counseling-center warmth | same warmth + credentials, conditions, care model |
| Section order | reference sequence | ours (defined separately) |
| **Kept** | serif/sans split · italic-word emphasis · the arch · pill nav · hairline lists · near-zero shadow · 3-beat section rhythm | |

---

## 2. Core principles

1. **Bone paper, never white page.** White is reserved for cards and the nav pill so they
   lift off the surface.
2. **Serif says the feeling, sans says the facts.** Emotional lines are large serif at
   weight 400. Explanatory lines are small, light sans at 1.7 leading.
3. **Italic-inside-roman emphasis.** One word per headline flips to serif *italic*. This is
   the whole personality in one gesture — use it, but only once per line.
4. **Center-axis storytelling.** Narrative sections are centered and capped at 640px, so the
   page reads like a letter rather than a brochure.
5. **The arch.** Round top, flat bottom, on every portrait. It is the brand shape.
6. **Air over ornament.** 120–160px between sections. Dividers are hairlines, never boxes.
7. **Credibility is quiet.** Credentials appear as small tracked labels and hairline rows,
   never as badges, seals, or shields. Authority through restraint.
8. **Three-beat rhythm:** micro-label → serif headline → one calm sans subline.

---

## 3. Color

### Foundation
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F6F3EE` | page canvas |
| `--paper-deep` | `#EDE8E0` | alternating section band |
| `--surface` | `#FFFFFF` | cards, nav pill, accordion rows |
| `--hairline` | `#E2DCD3` | 1px dividers, card borders, list rows |

### Ink
| Token | Hex | On paper | Use |
|---|---|---|---|
| `--ink` | `#191C1A` | 15.6:1 | headlines, serif display |
| `--ink-body` | `#5F6360` | 5.5:1 | paragraphs |
| `--ink-muted` | `#6C6F69` | 4.6:1 | micro-labels, meta, captions |

> `--ink-muted` is deliberately darker than the reference's. Micro-labels are 10.5px —
> they need the contrast. Never lighten it.

### Evergreen — the only saturated color
| Token | Hex | Use |
|---|---|---|
| `--forest-900` | `#1F3A34` | primary buttons, arrow circles (11:1 on paper) |
| `--forest-800` | `#294A43` | footer background |
| `--forest-600` | `#3D655C` | hover / pressed |
| `--forest-50` | `#E8EEEA` | tint fills, selected states, icon backdrops |

### Ambient wash
Very low saturation, bleeding in from the page edges and gone by ~40%.

| Token | Hex |
|---|---|
| `--wash-sage` | `#DCE6DF` |
| `--wash-sand` | `#EFE4D6` |

```css
background:
  radial-gradient(60% 50% at 0% 18%,  var(--wash-sage) 0%, transparent 62%),
  radial-gradient(55% 45% at 100% 4%, var(--wash-sand) 0%, transparent 60%),
  var(--paper);
```

### Rules
- Evergreen is the **only** color that ever fills a UI element. Everything else is
  paper, ink, or hairline.
- No red, no amber, no "alert" color anywhere in marketing UI. The one exception is the
  crisis notice (§6), which uses ink on `--paper-deep` — urgent through placement, not hue.
- No gradients on type, buttons, or cards. The ambient wash is the only gradient.

---

## 4. Typography

### Families
```css
--font-display: "Instrument Serif", "Fraunces", Georgia, "Times New Roman", serif;
--font-sans:    "Inter", -apple-system, "Segoe UI", Roboto, sans-serif;
```

Instrument Serif is the closest free match to the reference's licensed display face — same
high contrast, same calligraphic italic swing. Inter carries all functional text.

### Scale (fluid, mobile → desktop)
| Token | Size | Line height | Tracking | Weight | Family |
|---|---|---|---|---|---|
| `display-xl` — hero | 44 → 84px | 1.02 | -0.02em | 400 | serif |
| `display-lg` — section head | 36 → 64px | 1.05 | -0.02em | 400 | serif |
| `display-md` | 30 → 44px | 1.10 | -0.01em | 400 | serif |
| `card-title` | 22 → 26px | 1.20 | -0.01em | 400 | serif |
| `eyebrow-serif` | 19 → 22px | 1.40 | 0 | 400 | serif |
| `body` | 16px | 1.70 | 0 | 400 | sans |
| `body-sm` | 14px | 1.65 | 0 | 400 | sans |
| `label` — micro caps | 10.5px | 1.40 | **0.18em** | 500, UPPERCASE | sans |
| `credential` | 12px | 1.4 | 0.08em | 500, UPPERCASE | sans |

### Rules
- Serif is **always 400**. Never bold it — contrast comes from size alone.
- Emphasis = `<em>` rendering serif italic. One word per line, maximum.
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

--shadow-sm:   0 1px 2px  rgba(25,28,26,.04)
--shadow-card: 0 8px 28px rgba(25,28,26,.06)
--shadow-nav:  0 6px 24px rgba(25,28,26,.08)
```

Grids: 12-column. Cards 3-up (services, testimonials, articles) or 4-up (benefit items).
Conditions-treated is a 2-column hairline list, not cards.

Depth is *barely there*. If a shadow reads as a shadow, it is too strong.

---

## 6. Components

### Carried over from the reference
**Nav** — floating white pill, 64px tall, `--r-pill`, 16px from top, sticky. Links with
caret dropdowns left, wordmark centered, evergreen CTA pill right.

**Primary button** — evergreen pill, white 14px sans label, `padding: 10px 10px 10px 26px`,
with a 32px white circle holding an evergreen arrow flush right. Hover: `--forest-600`,
arrow rotates 45°.

**Circular icon button** — 40px evergreen circle, white arrow.

**Arch medallion** — 96×112px portrait, `--r-arch`, 6px paper ring, centered above a
statement block as a section opener.

**Statement block** — `eyebrow-serif` → `display-lg` with one italic word → `label` or one
sans subline. Centered, 640px.

**Hairline row** — full width, `padding-block: 22px`, `border-bottom: 1px solid
var(--hairline)`. Used for conditions treated and FAQ (FAQ adds a `+` rotating to `×`).

**Card** — white, `--r-card`, 24px padding, `--shadow-card`. Photo panel at top in
`--r-media`, serif title (second line italic), 14px body, circular arrow button.

**Testimonial card** — white, `--r-card`, `label`-style attribution.

**Footer** — full-bleed `--forest-800`, centered concentric-arch mark, paper-tinted text,
`label` column links, 120px vertical padding.

### New — the credibility layer
**Credential bar** — a hairline-bounded row directly under the hero. 3–4 items in
`credential` type separated by thin vertical rules: `MD` · `BOARD-CERTIFIED PSYCHIATRIST` ·
`LICENSED IN [STATE]` · `12 YEARS IN PRACTICE`. No icons, no badges. Restraint *is* the
authority signal.

**Care-model block** — explains diagnosis, medication management, and therapy coordination
in plain language. Two or three hairline rows, each: `label` (e.g. "MEDICATION MANAGEMENT")
→ `card-title` → one sentence of body. This is the section that separates a psychiatrist
from a counselor; it must be legible and unhedged.

**What-to-expect steps** — numbered 3-up. Number in `display-md` serif at `--forest-600`,
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

- Natural window light. Warm-neutral wardrobe: bone, sage, oat, charcoal.
- Real clinical and consultation settings, softly out of focus behind the subject.
- Subject mid-conversation or mid-thought — never posed-smiling stock, never a stethoscope,
  never crossed arms in a white coat.
- **Grade:** slight desaturation, lifted blacks, warm-neutral white balance. Every photo
  should look like it was shot in the same room on the same afternoon.
- **Two crops only:** the **arch** (portraits, medallions) and the **soft-rounded
  rectangle** `--r-media` / `--r-hero` (everything else).

**Line icons** — replacing the reference's illustrations.

- 1.25px stroke, round caps and joins, 24 / 32 / 72px sizes.
- `--ink` on paper, or `--forest-900` inside a `--forest-50` circle at 72px.
- Geometric and calm — no filled shapes, no duotone, no decorative flourishes.
- One consistent set across the whole site. Never mix icon families.

---

## 8. Motion

`--ease: cubic-bezier(.2,.7,.2,1)` · `--dur: 400ms`

Section entrances: fade plus 16px rise, staggered 60ms. Hover changes color or transform
only, never scale past 1.02. Nothing bounces. Full `prefers-reduced-motion` support.

---

## 9. Accessibility floor

- Body and label text meet 4.5:1 on paper; the tokens above are already checked.
- Never signal anything by color alone.
- Focus ring: `outline: 2px solid var(--forest-600); outline-offset: 3px` — visible on
  paper, white, and evergreen surfaces.
- Minimum touch target 44×44px, including the nav caret dropdowns.
- Serif display at 400 weight needs size to stay legible: never below 22px.
