/**
 * The site's icon family: a duotone "glass" set drawn for this site. Each content
 * icon is a solid base shape (currentColor) with a frosted gilt-tinted glass
 * layer over it, the gradients for which live once in BaseLayout (#ig-v, #ig-h).
 * The utility glyphs (arrow, caret, plus, menu, close) remain Phosphor Regular
 * (MIT, https://phosphoricons.com), single-colour, because they are controls.
 *
 * Each entry is the inner markup of a 256×256 viewBox, filled with
 * currentColor. The 20 content icons are wrapped in <g class="i-m">, the hook
 * the stylesheet (global.css, "Icons") uses for hover and idle motion. The
 * utility glyphs (arrow, caret, plus, menu, close) are left static: they are
 * controls, not illustrations.
 *
 * To swap one, copy the SVG's inner markup from the Phosphor set into the
 * entry below. Lives in a .ts module rather than the .astro component because
 * Astro components cannot export types, and both Icon.astro and Button.astro
 * need `IconName`.
 */

export const ICON_PATHS = {
  arrow    : '<path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>',
  caret    : '<path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>',
  plus     : '<path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>',
  menu     : '<path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"/>',
  close    : '<path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>',
  phone    : '<g class="i-m"><path class="i-bs" d="M72 78C72 150 106 184 178 184"/><circle class="i-b" cx="72" cy="78" r="38"/><circle class="i-b" cx="178" cy="184" r="38"/><path class="i-gs" style="stroke-width:20" d="M132 36a88 88 0 0 1 88 88"/><path class="i-gs" style="stroke-width:20" d="M132 80a44 44 0 0 1 44 44"/></g>',
  mail     : '<g class="i-m"><rect class="i-b" x="24" y="72" width="208" height="152" rx="24" /><path class="i-g" stroke-linejoin="round" d="M40 72H216L128 156Z"/></g>',
  pin      : '<g class="i-m"><ellipse class="i-b" cx="128" cy="206" rx="92" ry="30"/><path class="i-g" fill-rule="evenodd" d="M128 20a72 72 0 0 1 72 72c0 44-48 92-72 120-24-28-72-76-72-120a72 72 0 0 1 72-72ZM128 70a24 24 0 1 0 0 48 24 24 0 0 0 0-48Z"/></g>',
  clock    : '<g class="i-m"><circle class="i-b" cx="128" cy="128" r="104"/><path class="i-g" stroke-linejoin="round" d="M118 60h20v60h52v20h-72Z"/></g>',
  clipboard: '<g class="i-m"><rect class="i-b" x="48" y="40" width="160" height="200" rx="28" /><rect class="i-g" x="84" y="20" width="88" height="52" rx="18" /><rect class="i-g i-gh" x="80" y="124" width="96" height="18" rx="9" /><rect class="i-g i-gh" x="80" y="168" width="64" height="18" rx="9" /></g>',
  capsule  : '<g class="i-m"><g transform="rotate(-45 128 128)"><rect class="i-b" x="24" y="84" width="208" height="88" rx="44" /><path class="i-g"  d="M128 84h60a44 44 0 0 1 0 88h-60Z"/></g></g>',
  speech   : '<g class="i-m"><rect class="i-b" x="24" y="36" width="160" height="128" rx="32" /><path class="i-b"  d="M56 164v52l56-52Z"/><rect class="i-g i-gh" x="92" y="92" width="140" height="112" rx="30" /><path class="i-g i-gh"  d="M196 204v44l-48-44Z"/></g>',
  moon     : '<g class="i-m"><path class="i-b"  d="M148 24A104 104 0 1 0 232 160 88 88 0 0 1 148 24Z"/><circle class="i-g" cx="188" cy="76" r="40"/></g>',
  chart    : '<g class="i-m"><rect class="i-b" x="36" y="136" width="52" height="96" rx="14" /><rect class="i-b" x="102" y="84" width="52" height="148" rx="14" /><rect class="i-b" x="168" y="36" width="52" height="196" rx="14" /><rect class="i-g" x="20" y="150" width="216" height="92" rx="26" /></g>',
  people   : '<g class="i-m"><circle class="i-b" cx="92" cy="84" r="44"/><path class="i-b"  d="M20 224a72 72 0 0 1 144 0Z"/><circle class="i-g i-gh" cx="172" cy="100" r="38"/><path class="i-g"  d="M108 224a62 62 0 0 1 124 0Z"/></g>',
  mind     : '<g class="i-m"><circle class="i-b" cx="100" cy="116" r="76"/><rect class="i-b" x="112" y="168" width="32" height="68" rx="16" /><circle class="i-g i-gh" cx="160" cy="116" r="68"/></g>',
  heart    : '<g class="i-m"><path class="i-b"  d="M128 228C40 164 20 124 20 88a56 56 0 0 1 108-20 56 56 0 0 1 108 20c0 36-20 76-108 140Z"/><path class="i-g"  d="M168 228C128 200 108 176 108 152a32 32 0 0 1 60-14 32 32 0 0 1 60 14c0 24-20 48-60 76Z"/></g>',
  shield   : '<g class="i-m"><path class="i-b"  d="M128 20l92 34v68c0 56-40 92-92 114C76 214 36 178 36 122V54Z"/><path class="i-g" class="i-g i-gh" d="M128 20l92 34v68c0 56-40 92-92 114Z"/></g>',
  cloud    : '<g class="i-m"><rect class="i-b" x="24" y="112" width="196" height="100" rx="50" /><circle class="i-b" cx="100" cy="112" r="56"/><circle class="i-g" cx="164" cy="104" r="64"/></g>',
  pulse    : '<g class="i-m"><circle class="i-b" cx="128" cy="128" r="108"/><path class="i-gs" fill="none" d="M44 132h44l28-52 36 100 28-48h32"/></g>',
  hourglass: '<g class="i-m"><rect class="i-b" x="40" y="20" width="176" height="24" rx="12" /><rect class="i-b" x="40" y="212" width="176" height="24" rx="12" /><path class="i-b"  d="M56 232h144l-72-104Z"/><path class="i-g"  d="M56 44h144l-72 100Z"/></g>',
  loop     : '<g class="i-m"><path class="i-b" fill-rule="evenodd" d="M128 20a108 108 0 1 0 0 216 108 108 0 0 0 0-216Zm0 44a64 64 0 1 1 0 128 64 64 0 0 1 0-128Z"/><path class="i-g" stroke-linejoin="round" d="M168 20l60 56-80 12Z"/><circle class="i-g i-gh" cx="128" cy="128" r="36"/></g>',
  quote    : '<g class="i-m"><rect class="i-b" x="20" y="56" width="100" height="100" rx="24" /><path class="i-b"  d="M20 124h40v76L20 160Z"/><rect class="i-g i-gh" x="136" y="56" width="100" height="100" rx="24" /><path class="i-g i-gh"  d="M136 124h40v76l-40-40Z"/></g>',
  rosette  : '<g class="i-m"><path class="i-b" stroke-linejoin="round" d="M72 150L52 240l76-30 76 30-20-90Z"/><circle class="i-g" cx="128" cy="100" r="80"/></g>',
  whatsapp : '<g class="i-m"><circle class="i-b" cx="128" cy="120" r="104"/><path class="i-b" d="M32 236l18-68 50 44Z"/><path class="i-gs" style="stroke-width:26" d="M94 90C94 138 114 158 160 158"/><circle class="i-g" cx="94" cy="90" r="24"/><circle class="i-g" cx="160" cy="158" r="24"/></g>',
} as const;

export type IconName = keyof typeof ICON_PATHS;
