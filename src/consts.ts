import { SITE_URL, SITE_LOCALE } from '../site.config.mjs';

/* ==========================================================================
   SINGLE SOURCE OF TRUTH
   --------------------------------------------------------------------------
   Every fact rendered on the site comes from this file. Nothing is hard-coded
   into a component.

   Items marked  ⚠️ PLACEHOLDER  are not yet verified and MUST be replaced
   before the site goes live. Items marked  ⚠️ VERIFY  are believed correct
   but should be confirmed against a primary source.

   Verified facts are sourced from her RMI consultant profile:
   https://rmi.edu.pk/consultants/dr-shandana-qazi/
   ========================================================================== */

export const SITE = {
  url: SITE_URL,
  locale: SITE_LOCALE,
  lang: 'en',
} as const;

/* --------------------------------------------------------------------------
   Identity
   -------------------------------------------------------------------------- */

export const DOCTOR = {
  /** Verified — RMI consultant profile */
  name: 'Dr. Shandana Qazi',
  givenName: 'Shandana',
  familyName: 'Qazi',
  honorificPrefix: 'Dr.',
  jobTitle: 'Consultant Psychiatrist',
  specialty: 'Psychiatry',

  /** Verified — RMI consultant profile */
  qualifications: 'MBBS, FCPS (Psychiatry)',

  /** ⚠️ VERIFY — near-certain for a Peshawar practice, but confirm with her */
  languages: ['English', 'Urdu', 'Pashto'],

  /** Verified — "an empathetic, culturally sensitive, and evidence-based approach" */
  approach:
    'Her approach to psychiatric care is empathetic, culturally sensitive and evidence-based.',
} as const;

/** Verified — RMI consultant profile. Order is chronological. */
export const CREDENTIALS = [
  {
    label: 'MBBS',
    detail: 'Rehman Medical College, Peshawar',
    year: '2018',
  },
  {
    label: 'FCPS Psychiatry',
    detail: 'College of Physicians & Surgeons Pakistan',
    year: '2025',
  },
  {
    label: 'Psychological First Aid',
    detail: 'Certified practitioner',
    year: null,
  },
  {
    label: 'Continuing Professional Development',
    detail: 'Ongoing CPD in psychiatry',
    year: null,
  },
] as const;

/**
 * The credential bar under the hero. Split by kind, not flattened into one
 * list: the degrees are set as small letterspaced caps, the appointment as a
 * serif line, so the band reads as a signature rather than four equal chips.
 */
export const CREDENTIAL_BAR = {
  degrees: ['MBBS', 'FCPS Psychiatry'],
  role: 'Consultant Psychiatrist',
  institution: 'Rehman Medical Institute',
} as const;

/* --------------------------------------------------------------------------
   Practice location & contact
   -------------------------------------------------------------------------- */

export const PRACTICE = {
  /** Verified — rmi.edu.pk/contact-us */
  affiliation: 'Rehman Medical Institute',
  affiliationShort: 'RMI',
  affiliationUrl: 'https://rmi.edu.pk',
  profileUrl: 'https://rmi.edu.pk/consultants/dr-shandana-qazi/',

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
   Clinical content — all verified from her RMI profile
   -------------------------------------------------------------------------- */

/**
 * The three modalities named on her RMI profile.
 *
 * No longer rendered as a section — the journey section says the same thing as
 * a sequence, which is more use to a patient than three parallel tiles. Kept
 * because `availableService` in the JSON-LD needs actual services, and the six
 * cards below are conditions, not procedures.
 */
export const MODALITIES = [
  {
    name: 'Psychiatric evaluation',
    body: 'A full history of your symptoms and everything you have already tried, ending with a diagnosis explained in plain language.',
  },
  {
    name: 'Medication management',
    body: 'Starting, adjusting or safely tapering medication, with the reasoning, the realistic timeline and the side effects given before you decide.',
  },
  {
    name: 'Psychotherapeutic interventions',
    body: 'Structured talking therapy alongside medical treatment, in a way that fits how families and communities in Peshawar actually work.',
  },
] as const;

/**
 * The six conditions carried by the photographed card grid — two rows of three.
 *
 * A subset of AREAS_OF_FOCUS below, chosen for the page rather than for
 * completeness: the six a person is most likely to recognise in themselves,
 * plus female mental health, which is her stated particular focus. The two left
 * off are named in the section's own intro copy and still appear in `knowsAbout`
 * in the schema, so nothing is silently dropped.
 */
export const SERVICES = [
  {
    slug: 'depression',
    title: 'Depression and low',
    titleEm: 'mood',
    body: 'Persistent low mood, loss of interest, and the exhaustion that comes with both.',
    icon: 'cloud',
    image: 'depression',
  },
  {
    slug: 'anxiety',
    title: 'Anxiety and',
    titleEm: 'panic',
    body: 'Constant worry, physical tension, and panic attacks that arrive without warning.',
    icon: 'pulse',
    image: 'anxiety',
  },
  {
    slug: 'stress',
    title: 'Stress and',
    titleEm: 'burnout',
    body: 'Work, study and family pressure that has stopped being something you can absorb.',
    icon: 'hourglass',
    image: 'stress',
  },
  {
    slug: 'sleep',
    title: 'Sleep',
    titleEm: 'difficulties',
    body: 'Trouble falling asleep, staying asleep, or waking with no rest behind you.',
    icon: 'moon',
    image: 'sleep',
  },
  {
    slug: 'trauma',
    title: 'Trauma-related',
    titleEm: 'distress',
    body: 'Difficult events that are still shaping how you sleep, feel and relate to people.',
    icon: 'shield',
    image: 'trauma',
  },
  {
    /** Verified — "particular attention to female mental health". */
    slug: 'womens-health',
    title: 'Female mental',
    titleEm: 'health',
    body: 'Including perinatal and postnatal care, with attention to what women carry at home.',
    icon: 'heart',
    image: 'female-mental',
  },
] as const;

/**
 * The appointment, as a sequence — the journey section, not a service list.
 *
 * Deliberately not the same three items as SERVICES above. That grid answers
 * "what does she do"; this answers "what happens to me, and in what order",
 * which is the question a first-time patient is actually holding. The order is
 * carried by the numerals and by the path the steps are drawn on, so it does
 * not need to be narrated in words as well.
 */
export const CARE_STEPS = [
  {
    slug: 'history',
    number: '01',
    title: 'The whole',
    titleEm: 'history',
    body: 'The first appointment is the longest one. What you are experiencing, when it started, what you have already tried, and what is happening around you at home and at work.',
    note: 'Nothing is rushed, and what you say stays in the room.',
    icon: 'clipboard',
  },
  {
    slug: 'diagnosis',
    number: '02',
    title: 'A diagnosis in plain',
    titleEm: 'language',
    body: 'What she finds is explained in words you could repeat to your family: what it is, what it is not, and why the evidence points there.',
    note: 'No jargon, and no decision made before you understand it.',
    icon: 'mind',
  },
  {
    slug: 'plan',
    number: '03',
    title: 'The plan, decided',
    titleEm: 'together',
    body: 'Medication, talking therapy, or both, with the reasoning, the timeline and the side effects on the table before you decide. Reviewed and adjusted at follow-ups.',
    note: 'Some patients are treated with therapy alone.',
    icon: 'speech',
  },
] as const;

/**
 * Verified — her listed areas of expertise, expanded into the conditions each
 * covers.
 *
 * No longer rendered as its own section: six of these eight are the cards in
 * SERVICES above, and the page was carrying both. This stays as the complete
 * list, and it is what feeds `knowsAbout` in the schema — so all eight are
 * still declared to search engines, including the two without a card.
 */
export const AREAS_OF_FOCUS = [
  {
    title: 'Depression and low mood',
    body: 'Persistent low mood, loss of interest, and the exhaustion that comes with both.',
    icon: 'mind',
  },
  {
    title: 'Anxiety and panic',
    body: 'Constant worry, physical tension, and panic attacks that arrive without warning.',
    icon: 'chart',
  },
  {
    title: 'Stress and burnout',
    body: 'Work, study and family pressure that has stopped being something you can absorb.',
    icon: 'clock',
  },
  {
    title: 'Sleep difficulties',
    body: 'Trouble falling asleep, staying asleep, or waking with no rest behind you.',
    icon: 'moon',
  },
  {
    title: 'Obsessive–compulsive symptoms',
    body: 'Intrusive thoughts and the rituals that build up around keeping them quiet.',
    icon: 'loop',
  },
  {
    title: 'Trauma-related distress',
    body: 'Difficult events that are still shaping how you sleep, feel and relate to people.',
    icon: 'shield',
  },
  {
    title: 'Female mental health',
    body: 'Including perinatal and postnatal care, with attention to what women carry at home.',
    icon: 'heart',
  },
  {
    title: 'Psychotic disorders',
    body: 'Diagnosis, medication and long-term follow-up, with family kept in the picture.',
    icon: 'capsule',
  },
] as const;

/**
 * Feeds both the accordion and the FAQPage structured data.
 *
 * The questions stay in the reader's voice — that is who is asking, and it is
 * also what people type into a search box. The answers are the site speaking
 * about Dr. Qazi in the third person, never Dr. Qazi speaking as "I".
 */
export const FAQS = [
  {
    q: 'Will I have to take medication?',
    a: 'Not necessarily. Medication is one option among several, and it is a decision made together after the evaluation. Some patients are treated with psychotherapy alone. Nothing is started without an explanation of what it does, how long it takes to work, and what the side effects are.',
  },
  {
    q: 'Is what I say kept confidential?',
    a: 'Yes. What you say in the consulting room stays there. The narrow exceptions, where there is an immediate risk to your safety or someone else’s, are explained at the first appointment.',
  },
  {
    q: 'How long is the first appointment?',
    a: 'The first appointment is the longest, because it covers your full history. Follow-ups are shorter and focus on how the plan is working.',
  },
  {
    q: 'Can I bring a family member with me?',
    a: 'Yes, and many people do. You can also ask to be seen alone for part of the appointment. That is a normal request, and it causes no offence.',
  },
  {
    q: 'Does Dr. Qazi see adolescents?',
    a: 'Yes. Adolescent psychiatry is one of her areas of practice, alongside adult psychiatry and female mental health.',
  },
] as const;

/* --------------------------------------------------------------------------
   ⚠️ PLACEHOLDER — lorem ipsum standing in for real, consented reviews.
   Do not publish. Replace with genuine testimonials, with written patient
   consent, before the site goes live.
   -------------------------------------------------------------------------- */

export const TESTIMONIALS = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua veniam quis.',
    name: 'Placeholder name',
    meta: 'Placeholder detail',
  },
  {
    quote:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.',
    name: 'Placeholder name',
    meta: 'Placeholder detail',
  },
  {
    quote:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis.',
    name: 'Placeholder name',
    meta: 'Placeholder detail',
  },
] as const;

/* --------------------------------------------------------------------------
   Navigation
   -------------------------------------------------------------------------- */

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Conditions' },
  { href: '#care', label: 'Treatment' },
  { href: '#faq', label: 'Questions' },
] as const;

/* --------------------------------------------------------------------------
   SEO
   -------------------------------------------------------------------------- */

export const SEO = {
  title: 'Dr. Shandana Qazi, Consultant Psychiatrist in Peshawar',
  titleTemplate: '%s | Dr. Shandana Qazi, Psychiatrist Peshawar',
  description:
    'Dr. Shandana Qazi (MBBS, FCPS) is a Consultant Psychiatrist at Rehman Medical Institute, Hayatabad, Peshawar. Evaluation and treatment for depression, anxiety, stress, adolescent and adult psychiatry, and female mental health.',
  ogImageAlt:
    'Dr. Shandana Qazi, Consultant Psychiatrist at Rehman Medical Institute, Hayatabad, Peshawar',
} as const;
