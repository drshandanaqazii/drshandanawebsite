/**
 * The site's single line-icon family: 1.25px stroke, round caps and joins,
 * authored on a 24×24 grid. One family everywhere — never mix in another set.
 *
 * Lives in a .ts module rather than the .astro component because Astro
 * components cannot export types, and both Icon.astro and Button.astro need
 * `IconName`.
 */

export const ICON_PATHS = {
  arrow:     '<path d="M5 12h14M13 6l6 6-6 6"/>',
  caret:     '<path d="M6 9l6 6 6-6"/>',
  plus:      '<path d="M12 5v14M5 12h14"/>',
  phone:     '<path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5A16.5 16.5 0 0 1 3.5 5.7 2.5 2.5 0 0 1 6 3z"/>',
  mail:      '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.8 7l7.1 5.2a2 2 0 0 0 2.2 0L20.2 7"/>',
  pin:       '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock:     '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  clipboard: '<rect x="9" y="3" width="6" height="3.5" rx="1.2"/><path d="M8 6.5H6.5a1.5 1.5 0 0 0-1.5 1.5v10.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V8a1.5 1.5 0 0 0-1.5-1.5H16"/><path d="M8.5 12h7M8.5 15.5h4.5"/>',
  capsule:   '<rect x="2.5" y="8" width="19" height="8" rx="4"/><path d="M12 8v8"/>',
  speech:    '<path d="M4 5.5h9a2.5 2.5 0 0 1 2.5 2.5v5A2.5 2.5 0 0 1 13 15.5H8L4.5 18v-2.5H4a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5z"/><path d="M18 9.5h2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-.5V20l-2.5-2"/>',
  moon:      '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
  chart:     '<path d="M3.5 17l4.5-4.5 3.5 2.5L15.5 9l5 3.5"/><path d="M3.5 20.5h17"/>',
  people:    '<circle cx="9" cy="9" r="3.5"/><circle cx="16.5" cy="14.5" r="3.5"/>',
  mind:      '<path d="M12 3.5A5.5 5.5 0 0 1 17.5 9c0 2-1.2 3.1-1.8 4.3a4.2 4.2 0 0 0-.4 1.7h-6.6a4.2 4.2 0 0 0-.4-1.7C7.7 12.1 6.5 11 6.5 9A5.5 5.5 0 0 1 12 3.5z"/><path d="M10 18.5h4M10.5 21h3"/>',
  heart:     '<path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.5 3A11 11 0 0 1 12 20z"/>',
  /* Plain, no tick inside it. A shield with a checkmark reads as "verified",
     which is not what the trauma card is saying; empty, it reads as shelter. */
  shield:    '<path d="M12 3.5l7 2.7v5.4c0 4.2-2.9 7-7 8.9-4.1-1.9-7-4.7-7-8.9V6.2z"/>',
  /* Radii sized so no arc has to be scaled up to reach its endpoint — an
     over-tight radius is silently corrected by the renderer, and the shape you
     get back is not the one you drew. */
  cloud:     '<path d="M17.4 10.2A7.6 7.6 0 1 0 8.8 19.5h8.6a4.7 4.7 0 0 0 0-9.4z"/>',
  pulse:     '<path d="M2.5 12.5h4l2.2-5.6 3.7 10.6 2.4-6.1 1.6 3.1h5.1"/>',
  hourglass: '<path d="M6.5 3.5h11M6.5 20.5h11"/><path d="M8 3.5v3.3c0 2.6 4 3.6 4 5.2s-4 2.6-4 5.2v3.3"/><path d="M16 3.5v3.3c0 2.6-4 3.6-4 5.2s4 2.6 4 5.2v3.3"/>',
  loop:      '<path d="M4.8 10.2a7.5 7.5 0 0 1 12.6-3.1l2 2"/><path d="M19.2 13.8a7.5 7.5 0 0 1-12.6 3.1l-2-2"/><path d="M19.5 4.5v4.6h-4.6M4.5 19.5v-4.6h4.6"/>',
  quote:     '<path d="M9.5 6.5C6.9 7.6 5.5 9.7 5.5 12.6v4.9h5.9v-6H8.2c0-1.6.6-2.9 1.9-3.6zM20 6.5c-2.6 1.1-4 3.2-4 6.1v4.9h5.9v-6h-3.2c0-1.6.6-2.9 1.9-3.6z"/>',
  menu:      '<path d="M4 7.5h16M4 12h16M4 16.5h16"/>',
  close:     '<path d="M6 6l12 12M18 6L6 18"/>',
  whatsapp:  '<path d="M12.04 3.5a8.4 8.4 0 0 0-7.2 12.72L3.75 20.5l4.4-1.05a8.4 8.4 0 1 0 3.89-15.95z"/><path d="M9.2 8.3c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3-.1.5a5.6 5.6 0 0 0 2.6 2.3c.3.1.4 0 .5-.1l.5-.6c.1-.2.3-.2.5-.1l1.5.8c.2.1.3.2.3.4 0 .6-.4 1.4-1.3 1.6-1 .2-2.4 0-4.2-1.3a8 8 0 0 1-2.6-3.4c-.4-1-.3-1.9.1-2.4z"/>',
} as const;

export type IconName = keyof typeof ICON_PATHS;
