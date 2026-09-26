/* ==========================================================================
   THE PRACTICE — the two places she works, and which one is bookable
   --------------------------------------------------------------------------
   Split out of consts.ts rather than living in it, for one specific reason:
   src/data/services.ts names the practice in its page descriptions and its
   intro copy, and consts.ts imports services.ts. A venue layer defined in
   consts.ts therefore could not be read by the very file that has nine pages'
   worth of venue mentions in it, and those nine pages were the last place the
   old hospital address was still hardcoded.

   So the raw records and the switch live here, below both. consts.ts
   re-exports the whole module, so `import { PRACTICE } from '../consts'` keeps
   working everywhere it already appears — this is a move, not a rename.

   Start with the BOOKING_VENUE comment further down. It explains the switch.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Practice location & contact
   -------------------------------------------------------------------------- */

export const PRACTICE = {
  /** Verified — rmi.edu.pk/contact-us */
  affiliation: 'Rehman Medical Institute',
  affiliationShort: 'RMI',

  address: {
    street: 'Rehman Medical Institute, 5-B/2, Phase-V, Hayatabad',
    locality: 'Peshawar',
    region: 'Khyber Pakhtunkhwa',
    postalCode: '25000', // ⚠️ VERIFY — Hayatabad general code
    country: 'PK',
  },

  /**
   * ⚠️ VERIFY — approximate coordinates for RMI Hayatabad.
   * Confirm against the pin on her Google Business Profile before launch;
   * wrong coordinates actively damage local pack ranking.
   */
  geo: { lat: 33.9943, lng: 71.4406 },

  /** ⚠️ PLACEHOLDER — awaiting her direct booking number. */
  bookingPhone: '+92 91 5838666',
  bookingPhoneDisplay: '091 5838 666',

  /** Verified — RMI switchboard, safe to publish as the hospital line. */
  hospitalUan: '111 734 626',
  hospitalPhone: '+92 91 5838666',

  /** ⚠️ PLACEHOLDER — no WhatsApp number supplied yet. Digits only, no +. */
  whatsapp: '929158380000',

  /** Verified — RMI consultant profile */
  email: 'shandana.qazi@rmi.edu.pk',

  /**
   * ⚠️ PLACEHOLDER — RMI does not publish per-consultant OPD hours.
   * These drive `openingHoursSpecification` in the schema. Google penalises
   * hours that don't match reality, so replace before launch.
   */
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '14:00' },
    { days: ['Saturday'], opens: '09:00', closes: '13:00' },
  ],
  hoursDisplay: 'Mon–Thu, 9:00 am – 2:00 pm · Sat, 9:00 am – 1:00 pm',
} as const;

/* --------------------------------------------------------------------------
   Salma Psychiatric Clinic — her own practice, and the primary one

   This is where patients are meant to be seen. Rehman Medical Institute above
   is now her hospital affiliation rather than a place you can book: it is where
   she holds a consultant post, it is the source that verifies her credentials,
   and it keeps its emergency department in the legal pages — but it is no longer
   presented as an address, a set of hours, a map pin, or a booking route.

   That inversion is not written out page by page. It hangs off ONE switch,
   `SALMA.located`, via BOOKING_VENUE further down this file — see the long note
   there before changing anything here.

   The WhatsApp appointment number has been supplied. The street address and
   opening hours have not, so those stay unpublished until verified.

   `story` is the one part that cannot be written here at all. The clinic is
   named after someone, Dr. Qazi is writing that piece herself, and a stand-in
   paragraph of invented biography under a real person's name is the single worst
   thing this site could publish. `story.published` is therefore false, and while
   it is false the page prints an honest short line instead and the section of
   the page that would carry the story is not rendered. Paste her copy into
   `story.body`, set `published: true`, and the section appears.

   The address and hours remain unverified. While `located` is false, pages
   still name Salma as the primary clinic, omit map/address/hours and ask patients
   to confirm the location over WhatsApp.
   -------------------------------------------------------------------------- */

export const SALMA = {
  /** Verified — the clinic's own Instagram account, supplied by the practice. */
  name: 'Salma Psychiatric Clinic',
  /** The nav tab and the wordmark. Short by design. */
  shortName: 'Salma',
  tagline: 'Her own practice, and the name it carries.',

  /**
   * Verified — https://www.instagram.com/salma.psychiatric.clinic/
   *
   * The clinic's only public presence at the time of writing, which makes it
   * the one link that corroborates the practice exists. It goes in `sameAs` in
   * the schema for exactly that reason: with no Google Business Profile yet, it
   * is the sole external signal tying the name to something real.
   */
  instagram: 'https://www.instagram.com/salma.psychiatric.clinic/',
  instagramHandle: '@salma.psychiatric.clinic',

  /** Confirmed by the practice as its WhatsApp appointment number. */
  whatsapp: '923259940742',
  whatsappDisplay: '+92 325 994 0742',

  /**
   * The personal piece behind the name. Dr. Qazi's own words — nothing here is
   * written for her. See the block comment above before touching this.
   */
  story: {
    published: false,
    /** Her copy goes here. Paragraphs as separate strings, not one blob. */
    body: [] as string[],
    /** Printed while `published` is false. Says nothing it cannot support. */
    placeholder:
      'The clinic is named after someone. Dr. Qazi is writing that piece herself, and it will be published here in her own words rather than paraphrased in ours.',
  },

  /** Salma is the booking venue; retain the existing clinic location on the map. */
  located: true,

  /**
   * ⚠️ PLACEHOLDER — the neighbourhood, for headings and the map card.
   * "Hayatabad", "University Town", "Saddar". The city on its own is too coarse
   * to help anyone decide which way to set off.
   */
  area: 'Hayatabad',

  /** ⚠️ PLACEHOLDER — every field. Not rendered while `located` is false. */
  address: {
    street: '5-B/2, Phase-V, Hayatabad',
    locality: PRACTICE.address.locality,
    region: PRACTICE.address.region,
    postalCode: PRACTICE.address.postalCode,
    country: PRACTICE.address.country,
  },

  /** ⚠️ PLACEHOLDER — not rendered while `located` is false. */
  geo: PRACTICE.geo,

  /** ⚠️ PLACEHOLDER — no separate clinic line supplied yet. */
  phone: '',
  phoneDisplay: '',

  /** ⚠️ PLACEHOLDER — clinic hours not supplied. */
  hours: PRACTICE.hours,
  hoursDisplay: PRACTICE.hoursDisplay,
} as const;

/* --------------------------------------------------------------------------
   Where you are seen — the one venue the site books through

   Both practices are described above in their own terms. Neither is read
   directly by a page that needs an address, a phone number or a set of hours:
   those all read BOOKING_VENUE, which is whichever of the two is currently the
   bookable one.

   Why the indirection exists. Making Salma the primary clinic is not a copy
   change — it is the same twelve facts moving from one building to another
   across nine files, and every one of them is a fact a patient acts on. Done as
   nine separate edits it is nine chances to leave a phone number pointing at a
   hospital switchboard. Done here it is one line, and it cannot be done by
   halves.

   The `Venue` shape is deliberately the intersection of what the two places can
   both supply: a name, an address, coordinates, a number and hours. Anything
   true of only one of them — RMI's UAN, its consultant profile URL, Salma's
   Instagram — stays on its own record and is reached for explicitly by whatever
   needs it.
   -------------------------------------------------------------------------- */

export interface Venue {
  /** As it should be spoken: "Salma Psychiatric Clinic". */
  name: string;
  /** For furniture with no room for the full name — the map card, chips. */
  shortName: string;
  /**
   * The neighbourhood, where the city alone is too coarse to be useful.
   *
   * "Rehman Medical Institute, Peshawar" is true and tells a Peshawari nothing;
   * "Rehman Medical Institute, Hayatabad" tells them which side of the city to
   * set off for. It is not part of `address` because it is a display label, not
   * a line of the postal address — the street line already contains it.
   *
   * Falls back to the locality wherever it is unset, so a venue that has not
   * supplied one still prints something true.
   */
  area?: string;
  /** The page on this site that describes it, if it has one. */
  href?: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  /** Dialable form, with country code. */
  phone: string;
  /** Printed form, local convention. */
  phoneDisplay: string;
  hours: readonly { readonly days: readonly string[]; opens: string; closes: string }[];
  hoursDisplay: string;
  /**
   * How to actually find the place, as paragraphs. The one part of a venue that
   * cannot be templated: "ask at reception for the outpatient department" is
   * true of a hospital and meaningless at a two-room clinic.
   *
   * Empty means not yet written, and /contact prints an honest note in its place
   * rather than generic filler. It never invents directions — a wrong landmark
   * is worse than no landmark.
   */
  directions: readonly string[];
}

const RMI_VENUE: Venue = {
  name: PRACTICE.affiliation,
  shortName: PRACTICE.affiliationShort,
  area: 'Hayatabad',
  address: PRACTICE.address,
  geo: PRACTICE.geo,
  phone: PRACTICE.bookingPhone,
  phoneDisplay: PRACTICE.bookingPhoneDisplay,
  hours: PRACTICE.hours,
  hoursDisplay: PRACTICE.hoursDisplay,
  directions: [
    'Rehman Medical Institute is on 5-B/2, Phase-V, Hayatabad, on the western side of Peshawar. It is well known locally and every rickshaw and taxi driver in the city will recognise the name; if you are driving, the map above will take you to the gate. Parking is on site.',
    'Psychiatry consultations are held in the outpatient department. Ask at reception for Dr. Shandana Qazi, Consultant Psychiatrist, and you will be directed. Arriving ten or fifteen minutes early leaves room for registration without eating into the appointment itself.',
  ],
};

const SALMA_VENUE: Venue = {
  name: SALMA.name,
  shortName: SALMA.shortName,
  /** ⚠️ PLACEHOLDER — set to the clinic's neighbourhood with the address. */
  area: SALMA.area,
  href: '/salma',
  address: SALMA.address,
  geo: SALMA.geo,
  phone: SALMA.phone,
  phoneDisplay: SALMA.phoneDisplay,
  hours: SALMA.hours,
  hoursDisplay: SALMA.hoursDisplay,
  /** ⚠️ PLACEHOLDER — write these with the address. See the note on the field. */
  directions: [],
};

/**
 * The primary appointment venue across the site. Address and map details are
 * shown only after Salma's exact location has been verified.
 */
export const BOOKING_VENUE: Venue = SALMA_VENUE;

/**
 * "Hayatabad" — the neighbourhood if the venue has one, the city if not.
 * Printed wherever a heading names the place rather than addressing an envelope.
 */
export const BOOKING_AREA = BOOKING_VENUE.area || BOOKING_VENUE.address.locality;

/**
 * Whether Rehman Medical Institute is still offered as somewhere to book.
 *
 * The inverse of the switch, named rather than written as `!SALMA.located` at
 * six call sites — a bare negation at the point of use reads as "if the clinic
 * has no address", which is not what the page is asking. It is asking whether
 * to offer the hospital as a venue, and those two happen to coincide only
 * because the hospital is the fallback.
 *
 * RMI keeps its consultant post, its profile, its
 * emergency department in the legal pages and its place in the schema as her
 * affiliation — it simply stops being an address a patient is sent to.
 */
export const RMI_BOOKABLE = false;

/**
 * "Salma Psychiatric Clinic, University Town, Peshawar" — the practice as a
 * search engine should read it, and the one phrase every description shares.
 *
 * It exists because the meta description is where the venue leak was worst: it
 * is rendered into `description`, `og:description`, `twitter:description` and
 * the Physician node's `description` on all twenty pages, plus the SEO block of
 * every service page in this directory. A hardcoded hospital there outnumbered
 * every visible mention of the clinic on the site put together. Built from the
 * venue, it moves with everything else.
 *
 * Both branches were counted against the ~160 characters Google renders; the
 * longer of the two leaves the site description at about 158.
 */
/**
 * The bookable venue's name on its own.
 *
 * The shorter of the two forms, for copy that has already said where in the
 * world it is — every service page description opens "… in Peshawar", and
 * VENUE_PHRASE would print the city a second time in the same sentence.
 */
export const VENUE_NAME = BOOKING_VENUE.name;

export const VENUE_PHRASE = [
  BOOKING_VENUE.name,
  BOOKING_VENUE.area,
  BOOKING_VENUE.address.locality,
]
  .filter(Boolean)
  .join(', ');
