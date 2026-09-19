/**
 * Decorative background motifs.
 *
 * Separate from lib/icons.ts on purpose, and not interchangeable with it. An
 * icon is read: it sits at 24px beside a label and carries meaning. These are
 * not read at all — they are drawn at 300–900px behind the content, at an
 * opacity where the shape registers as texture and never as an illustration.
 * Mixing the two families up is the failure mode this split exists to prevent:
 * a brain at 24px in a card is a clipart sticker, and a 700px icon is a logo.
 *
 * Rules that keep them a texture rather than a picture:
 *   - Stroke only, no fills except the neuron nodes, which are 2px dots.
 *   - Rendered with vector-effect: non-scaling-stroke (see .motif in
 *     global.css), so a hairline stays a hairline whatever the motif is scaled
 *     to. Without it a 240-unit drawing at 700px multiplies its stroke by
 *     three and stops being faint.
 *   - Every one of them is aria-hidden. None of them carries information; a
 *     screen reader announcing "brain diagram" here would be announcing
 *     wallpaper.
 *
 * Placement is deliberately scarce — see the note above .motif in global.css
 * before adding a sixth use.
 */

export interface Motif {
  viewBox: string;
  /** Inner SVG markup. Stroke and opacity come from CSS, never from here. */
  markup: string;
  /**
   * A single path, in this motif's own viewBox units, for a travelling light
   * to run along — see the `spark` prop on Motif.astro.
   *
   * It is a separate `d` rather than a reference to one of the paths above,
   * and the difference matters: the drawing is made of nine disconnected
   * strokes, so a light following any one of them stops dead at its end. This
   * is one continuous circuit picked *through* the drawing — along a gyrus,
   * across to the next, out to the stem — so the light always has somewhere to
   * go. It is a route, not an outline, and it is only ever traced by a 3-unit
   * dot, so it does not need to be beautiful on its own.
   */
  spark?: string;
}

/* The cerebrum in profile, facing left: one closed contour, six gyri sweeping
   inside it, and the stem and cerebellum tucked under the lower right. Drawn
   rather than traced from an anatomical plate — at 5% opacity the reading is
   "a brain" long before any lobe is identifiable, and a literal diagram behind
   body copy would be both busier and, on a doctor's site, a claim. */
const brain: Motif = {
  viewBox: '0 0 240 210',
  markup: `
    <path d="M58 62C62 34 92 18 120 26C148 14 182 30 186 58C210 66 216 96 198 112C206 136 188 158 164 156C156 174 130 180 116 166C96 176 72 166 68 146C44 142 32 116 46 98C34 82 42 64 58 62Z"/>
    <path d="M62 70C84 74 92 92 80 106C68 120 78 138 96 138"/>
    <path d="M108 30C100 52 112 66 128 64C146 62 156 76 148 92C142 104 148 118 162 120"/>
    <path d="M186 62C168 70 164 88 178 96C192 104 194 124 180 132"/>
    <path d="M96 146C104 132 124 130 134 142C144 154 162 152 168 140"/>
    <path d="M46 100C60 104 68 116 62 130"/>
    <path d="M120 92C132 96 136 110 126 118C116 126 118 140 128 144"/>
    <path d="M138 170C142 184 138 196 128 202"/>
    <path d="M152 164C172 160 186 172 182 186C178 198 156 198 148 186"/>
  `,
  /* A closed circuit: out along the top of the skull, down the right-hand
     gyrus, back left under the lower fold, up the left gyrus, and home. It
     closes on itself so the light loops without a jump — the start and end
     points are the same coordinate, not merely near each other. */
  spark: `
    M58 62C62 34 92 18 120 26C148 14 182 30 186 58
    C168 70 164 88 178 96C192 104 194 124 180 132
    C176 140 172 139 168 140
    C162 152 144 154 134 142C124 130 104 132 96 146
    C95 143 95 140 96 138
    C78 138 68 120 80 106C92 92 84 74 62 70
    C60 67 58 65 58 62Z
  `,
};

/* A neural net: cells, and the paths between them.
 *
 * Every edge is a curve and every node grows at least one stub that ends in
 * nothing. Both are corrections to the first version, which used straight
 * lines between nodes only: that draws a closed polygon mesh, and a polygon
 * mesh is the default background of every SaaS landing page written since
 * 2016. Curves and loose dendrites are the whole difference between a figure
 * that reads biological and one that reads like a network diagram — which is
 * the entire reason for using this shape on a psychiatry site.
 */
const neurons: Motif = {
  viewBox: '0 0 260 200',
  markup: `
    <path d="M24 40Q52 24 86 22Q122 28 150 54Q180 34 212 30Q236 56 240 96"/>
    <path d="M150 54Q178 84 188 120Q218 116 240 96"/>
    <path d="M188 120Q218 136 236 158"/>
    <path d="M120 104Q126 76 150 54"/>
    <path d="M120 104Q88 106 58 92Q36 68 24 40"/>
    <path d="M58 92Q36 120 30 150Q58 166 96 168Q114 138 120 104"/>
    <path d="M96 168Q132 176 166 178Q202 176 236 158"/>
    <path d="M166 178Q182 150 188 120"/>
    <path d="M24 40Q14 26 16 10"/>
    <path d="M212 30Q222 16 238 12"/>
    <path d="M240 96Q252 104 254 118"/>
    <path d="M96 168Q92 184 100 196"/>
    <path d="M120 104Q146 118 158 140"/>
    <path d="M58 92Q70 76 68 58"/>
    <circle cx="24" cy="40" r="2.5" data-node=""/>
    <circle cx="86" cy="22" r="2.5" data-node=""/>
    <circle cx="150" cy="54" r="3.5" data-node=""/>
    <circle cx="212" cy="30" r="2.5" data-node=""/>
    <circle cx="240" cy="96" r="2.5" data-node=""/>
    <circle cx="188" cy="120" r="3.5" data-node=""/>
    <circle cx="120" cy="104" r="3.5" data-node=""/>
    <circle cx="58" cy="92" r="2.5" data-node=""/>
    <circle cx="30" cy="150" r="2.5" data-node=""/>
    <circle cx="96" cy="168" r="3.5" data-node=""/>
    <circle cx="166" cy="178" r="2.5" data-node=""/>
    <circle cx="236" cy="158" r="2.5" data-node=""/>
  `,
};

/* Concentric rings from a single point — the same three-arc figure as the
   footer mark, closed and repeated. It is the calmest shape in the set, so it
   goes where the page is asking the reader to settle rather than to scan.
   Currently unused; kept because it is the obvious answer the next time a flat
   panel needs something and neither the brain nor the waves fit it. */
const ripple: Motif = {
  viewBox: '0 0 240 240',
  markup: `
    <circle cx="120" cy="120" r="22"/>
    <circle cx="120" cy="120" r="46"/>
    <circle cx="120" cy="120" r="70"/>
    <circle cx="120" cy="120" r="94"/>
    <circle cx="120" cy="120" r="118"/>
  `,
};

/* Four settling waves. Read left to right the amplitude falls and the line
   levels out, which is the one motif here that says something — it is used
   where the copy is about a course of treatment rather than a condition. */
const calm: Motif = {
  viewBox: '0 0 320 120',
  markup: `
    <path d="M0 30C40 30 44 6 72 6C100 6 104 54 144 54C184 54 188 26 224 26C260 26 264 42 320 42"/>
    <path d="M0 56C40 56 46 36 74 36C102 36 106 74 146 74C186 74 190 52 226 52C262 52 266 64 320 64"/>
    <path d="M0 82C40 82 48 68 76 68C104 68 108 94 148 94C188 94 192 78 228 78C264 78 268 86 320 86"/>
    <path d="M0 106C40 106 50 98 78 98C106 98 110 114 150 114C190 114 194 106 230 106C266 106 270 110 320 110"/>
  `,
};

export const MOTIFS = { brain, neurons, ripple, calm } as const;

export type MotifName = keyof typeof MOTIFS;
