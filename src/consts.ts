import { SITE_URL, SITE_LOCALE } from '../site.config.mjs';
import { SERVICES } from './data/services';
import type { IconName } from './lib/icons';

/* ==========================================================================
   SINGLE SOURCE OF TRUTH
   --------------------------------------------------------------------------
   Every fact rendered on the site comes from this file. Nothing is hard-coded
   into a component.

   The one exception is long-form service copy, which lives in
   src/data/services.ts — it is content rather than fact, it runs to several
   hundred lines, and it generates its own pages. This file imports from it so
   the two can never describe different sets of services.

   Items marked  ⚠️ PLACEHOLDER  are not yet verified and MUST be replaced
   before the site goes live. Items marked  ⚠️ VERIFY  are believed correct
   but should be confirmed against a primary source.

   Verified facts are sourced from her consultant profile at Rehman Medical
   Institute. This site does not link visitors to that profile.
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

  /**
   * The post-nominal line. Degrees only, and deliberately not every
   * qualification she holds — this string is the `honorificSuffix` in the
   * schema and the line under her name in the footer, and post-nominals are a
   * convention with a short list, not an inventory. The diploma and the
   * certifications are in CREDENTIALS; the departmental and teaching posts are
   * in ACADEMIC_ROLES.
   */
  qualifications: 'MBBS, FCPS (Psychiatry)',

  /** ⚠️ VERIFY — near-certain for a Peshawar practice, but confirm with her */
  languages: ['English', 'Urdu', 'Pashto'],

  /** Verified — "an empathetic, culturally sensitive, and evidence-based approach" */
  approach:
    'Her approach to psychiatric care is empathetic, culturally sensitive and evidence-based.',
} as const;

/**
 * What she has been awarded. Order is chronological.
 *
 * ⚠️ EXACTLY FOUR. The diagram on /about arranges these around a seal in four
 * quadrants, and the quadrant names are a fixed list in that page's frontmatter.
 * A fifth entry here renders nowhere and disappears silently. Anything that is a
 * *post* rather than an award — head of a department, director of a course —
 * belongs in ACADEMIC_ROLES below, not here.
 *
 * The first two are verified against the RMI consultant profile. The diploma is
 * supplied by Dr. Qazi directly; the awarding body and the year are still to
 * come from her, and the entry prints without a year until they do.
 */
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
    /** ⚠️ VERIFY — awarding institution and year not yet supplied. */
    label: 'Diploma in Islamic Psychotherapy',
    detail: 'Postgraduate diploma',
    year: null,
  },
  {
    label: 'Psychological First Aid',
    detail: 'Certified practitioner',
    year: null,
  },
] as const;

/**
 * The line printed under the qualifications diagram.
 *
 * Continuing professional development used to be the fourth card. It is not an
 * award and it has no awarding body, so on a diagram of certificates it was the
 * one item that could not be checked — it reads better as a closing clause than
 * as a credential with a box around it, and moving it is what made room for the
 * diploma.
 */
export const CREDENTIALS_NOTE = 'With ongoing continuing professional development in psychiatry.';

/**
 * The posts she holds, as distinct from the qualifications she has been
 * awarded. These are jobs with responsibilities attached, and two of the three
 * are academic rather than clinical — which is why they are not on the
 * credentials diagram and why /about gives them a section of their own.
 *
 * `href` is set where the post has somewhere to point. Left undefined the item
 * renders as plain text rather than as a dead link.
 */
export const ACADEMIC_ROLES = [
  {
    icon: 'people' as IconName,
    title: 'Head of the Behavioural Sciences Department',
    org: 'Rehman Medical College, Peshawar',
    body: 'She leads the department that teaches behavioural sciences to Rehman Medical College’s undergraduate medical students — the part of a doctor’s training that covers how people actually experience illness, and how to ask about it.',
  },
  {
    icon: 'clipboard' as IconName,
    title: 'Course Director, Post Graduate Certification in Primary Care Psychiatry',
    org: 'Rehman Medical College, Peshawar',
    body: 'She directs the certification that trains general practitioners and primary care doctors to recognise and manage mental illness in their own clinics. Most people in Khyber Pakhtunkhwa never reach a psychiatrist; this is the course that aims to mean they do not have to.',
  },
  {
    icon: 'mind' as IconName,
    title: 'Consultant Psychiatrist',
    org: 'Rehman Medical Institute, Hayatabad',
    body: 'Her clinical post, and the one this site is mostly about: outpatient psychiatry in adolescent and adult practice, with a particular focus on female mental health.',
  },
] as const;

/**
 * Public talks, teaching sessions and awareness work — the things she does
 * outside the consulting room.
 *
 * ⚠️ PLACEHOLDER ENTRIES. Every item below is a real, stated engagement, but
 * none of them has a photograph yet, and the first has no write-up. Dr. Qazi is
 * sending images from the college sessions and from the IM Sciences talk; drop
 * them into src/assets and set `image` to the import. Until an entry has one it
 * renders as a text card, which is the correct fallback and not a broken state.
 *
 * `date` is written out rather than stored as a Date: these are captions, they
 * are never sorted or compared, and a parsed date would only invite a timezone
 * to shift a talk onto the wrong day.
 */
export interface Engagement {
  title: string;
  venue: string;
  /** Free text — "September 2026", "Ongoing". Never parsed. */
  date: string;
  body: string;
  /** Set once a photograph exists. See the note above. */
  image?: ImageMetadata;
  imageAlt?: string;
}

export const ENGAGEMENTS: Engagement[] = [
  {
    title: 'Primary care psychiatry, taught to the doctors people already see',
    venue: 'Rehman Medical College',
    date: 'Ongoing',
    body: 'The postgraduate certification she directs, run for general practitioners who are treating anxiety, depression and insomnia in their own clinics and want to do it properly.',
  },
  {
    title: 'Behavioural sciences, at the undergraduate bench',
    venue: 'Rehman Medical College',
    date: 'Ongoing',
    body: 'Departmental teaching for medical students: how to take a history from someone who is frightened of the answer, and how to say a diagnosis out loud.',
  },
];

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

   Moved to src/data/practice.ts so that services.ts can read it too — see the
   header of that file. Re-exported here in full, so every existing
   `import { PRACTICE } from '../consts'` continues to resolve exactly as
   before, along with SALMA, BOOKING_VENUE, BOOKING_AREA and RMI_BOOKABLE.
   -------------------------------------------------------------------------- */

export * from './data/practice';
import {
  PRACTICE,
  SALMA,
  BOOKING_VENUE,
  RMI_BOOKABLE,
  VENUE_PHRASE,
} from './data/practice';

/* --------------------------------------------------------------------------
   Clinical content — all verified from her RMI profile
   -------------------------------------------------------------------------- */

/**
 * The three modalities named on her RMI profile.
 *
 * Two descriptions each, because two things read them. `body` is the full
 * sentence, and it is what `availableService` and `possibleTreatment` carry in
 * the JSON-LD — a search engine has room for it and no layout to break. `blurb`
 * is the line printed on the card in the tree on /services, held to about a
 * dozen words: the card sets it over a photograph, where a third line of type
 * costs the picture the band it is read against.
 */
export const MODALITIES = [
  {
    name: 'Psychiatric evaluation',
    blurb: 'A full history, ending in a diagnosis explained in plain language.',
    body: 'A full history of your symptoms and everything you have already tried, ending with a diagnosis explained in plain language.',
  },
  {
    name: 'Medication management',
    blurb: 'Starting, adjusting or safely tapering, with the reasoning given first.',
    body: 'Starting, adjusting or safely tapering medication, with the reasoning, the realistic timeline and the side effects given before you decide.',
  },
  {
    name: 'Psychotherapeutic interventions',
    blurb: 'Structured talking therapy alongside medical treatment.',
    body: 'Structured talking therapy alongside medical treatment, in a way that fits how families and communities in Peshawar actually work.',
  },
] as const;

/**
 * The services offered, in full. Defined once in src/data/services.ts,
 * which also generates a page for each of them.
 *
 * `FEATURED_SERVICES` is the subset carried by the photographed grid on the homepage —
 * two rows of three, chosen for what a person is most likely to recognise in
 * themselves, plus female mental health, which is her stated particular focus.
 * The three without a card are not dropped: they are named in that section's
 * own copy, listed in full on /services, and declared in `knowsAbout`.
 */
export { SERVICES, SERVICES_BY_SLUG, SERVICE_KEYWORDS, FEATURED_SERVICES } from './data/services';

/**
 * The appointment, as a sequence — the journey section, not a service list.
 *
 * Deliberately not the same three items as FEATURED_SERVICES above. That grid answers
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

/* --------------------------------------------------------------------------
   Appointments

   The content of /appointments. It lives here for the same reason everything
   else does — the page, the footer and the schema all read one source — but
   note how much of this block is still unverified.

   ⚠️ READ BEFORE LAUNCH. The second entry in APPOINTMENT_MODES, the online
   consultation, is a PLACEHOLDER in full. Nothing on her RMI profile states
   that she holds video consultations, on what platform, or at what hours, and
   a practice that does not offer them must not advertise them.

   If she does not: delete the `online` entry from APPOINTMENT_MODES. The page
   is built to read from the array, so it collapses to a single-mode layout and
   nothing else needs editing. The platform line is flagged individually below
   for the case where she does.
   -------------------------------------------------------------------------- */

export interface AppointmentMode {
  slug: string;
  icon: IconName;
  /** The small caps label over the title. */
  label: string;
  /** The chip beside the label. One short phrase — it shares a line. */
  availability: string;
  title: string;
  /** The ruled rows inside the card. Scanned, not read: keep values short. */
  facts: { label: string; value: string }[];
  /** "Best suited to" — the dashed list under the facts. */
  suits: string[];
  /** The honest caveat. Every mode has one; a mode with no limits is a advert. */
  note: string;
}

/**
 * "Mon–Thu & Sat" — the clinic's open days, abbreviated for the chip on the
 * card. Derived from the bookable venue's hours rather than written out, so the
 * chip can never disagree with the hours table further down the same page —
 * including after the clinic switch is thrown and those hours are Salma's.
 */
const listedDays = BOOKING_VENUE.hours
  .map((h) =>
    h.days.length === 1
      ? h.days[0].slice(0, 3)
      : `${h.days[0].slice(0, 3)}–${h.days[h.days.length - 1].slice(0, 3)}`
  )
  .join(' & ');
const openDays = listedDays || 'By appointment';

export const APPOINTMENT_MODES: AppointmentMode[] = [
  {
    slug: 'in-person',
    icon: 'pin',
    label: 'In person',
    availability: openDays,
    /* Both the title and the "Where" row name the bookable venue rather than
       stating Hayatabad outright. Before the switch that resolves to the RMI
       outpatient department, exactly as it read before; after it, to the
       clinic — and neither version has to be remembered and edited by hand. */
    title: `At ${BOOKING_VENUE.name}`,
    facts: [
      {
        label: 'Where',
        value: RMI_BOOKABLE
          ? `Outpatient department, ${PRACTICE.affiliation}`
          : `${BOOKING_VENUE.name}, ${BOOKING_VENUE.address.locality}`,
      },
      /* Same label and same position as the online card's row, so the two
         halves of the panel line up row for row — the pair is meant to be read
         across, and a card with one fewer row breaks the comparison. */
      { label: 'Platform', value: 'Face to face, in the consulting room' },
      /* No appointment lengths here, deliberately. RMI publishes no
         per-consultant durations, and a printed number is one a patient will
         hold the clinic to. The first appointment is described as the longest
         one, in words, in APPOINTMENT_GLANCE and on /faq. */
      { label: 'Booked by', value: 'WhatsApp' },
      { label: 'Languages', value: DOCTOR.languages.join(', ') },
    ],
    suits: [
      'A first assessment, where the history is long or complicated',
      'Anything needing a physical examination, blood tests or an ECG',
      'Starting, changing or stopping medication',
      'Appointments where a family member is coming with you',
    ],
    note: 'Some things can only be done in the room. If an examination or an investigation is needed, you will be asked to come in.',
  },
  {
    slug: 'online',
    icon: 'cloud',
    label: 'Online',
    /* ⚠️ PLACEHOLDER — no published telepsychiatry hours. */
    availability: 'By arrangement',
    title: 'By video, from wherever you are',
    facts: [
      { label: 'Where', value: 'Anywhere' },
      /* ⚠️ PLACEHOLDER — platform not confirmed. */
      { label: 'Platform', value: 'WhatsApp video, or a link sent to you' },
      { label: 'Booked by', value: 'Telephone or WhatsApp' },
      { label: 'Languages', value: DOCTOR.languages.join(', ') },
    ],
    suits: [
      'Follow-ups, where the plan is working and needs reviewing',
      'Patients living outside Peshawar, or abroad',
      'Reviewing test results or a report you already have',
      'Anyone for whom leaving the house is part of the problem',
    ],
    /* ⚠️ PLACEHOLDER — remote prescribing practice not confirmed. */
    note: 'An online consultation is not the right route for an emergency, or for a first assessment of a severe illness.',
  },
];

/** The three steps of booking, in order. Numbered on the page. */
export const BOOKING_STEPS = [
  {
    number: '01',
    title: 'Send a WhatsApp message',
    body: 'Message Salma Psychiatric Clinic to ask about an appointment with Dr. Shandana Qazi, Consultant Psychiatrist. Say whether you would like to be seen at the clinic or online. The team will confirm availability and the clinic location. No referral letter is needed.',
  },
  {
    number: '02',
    title: 'Confirm the slot',
    body: 'You are given the next available time and the consultation fee before anything is fixed. A WhatsApp message is answered during clinic hours rather than instantly. For an online appointment you are also told how the call will reach you.',
  },
  {
    number: '03',
    title: 'Come prepared',
    body: 'Bring your medication and any previous reports with you. For an online appointment, find a room where you will not be overheard and where the connection holds.',
  },
] as const;

/** What to have with you. Set as a .checklist — scanned, not read. */
export const APPOINTMENT_PREP = [
  'Any medication you are currently taking, in its packaging if possible',
  'Previous prescriptions, discharge summaries and test results',
  'Roughly when things started, and anything that has changed recently',
  'The questions you want answered: they are easy to forget in the room',
  'A family member, if you would like one with you. You can still ask to be seen alone for part of the appointment.',
  'For an online consultation: a quiet room, a charged phone or laptop, and somewhere you will not be interrupted',
];

/**
 * The facts a person checks before booking rather than reads.
 *
 * Every line here is either drawn from a verified source or from an answer
 * already published on /faq — the fee line in particular is the exact position
 * stated there, and it deliberately quotes no number.
 */
export const APPOINTMENT_GLANCE = [
  {
    icon: 'clipboard' as IconName,
    label: 'Referral',
    value: 'Not required. You can book directly.',
  },
  {
    icon: 'hourglass' as IconName,
    label: 'First appointment',
    value: 'The longest one. It covers your full history. Follow-ups are shorter.',
  },
  {
    icon: 'speech' as IconName,
    label: 'Languages',
    value: DOCTOR.languages.join(', '),
  },
  {
    icon: 'people' as IconName,
    label: 'Bringing someone',
    value: 'Family are welcome, and you can ask to be seen alone for part of it.',
  },
  {
    icon: 'chart' as IconName,
    label: 'Fees',
    /* Who sets the fee changes with the venue, and it is not a detail: at the
       hospital the number is the hospital's and a patient can be told to ring
       the UAN for it, whereas at her own clinic it is the practice's own and
       that redirection would be a dead end. */
    value: RMI_BOOKABLE
      ? `Set by ${PRACTICE.affiliation} and confirmed when you book. Ask about accepted health plans on the same call.`
      : 'Confirmed when you book, before anything is fixed. Ask about accepted health plans on the same call.',
  },
  {
    icon: 'shield' as IconName,
    label: 'Confidentiality',
    value: 'What you say stays in the room. The narrow exceptions are explained at the first appointment.',
  },
];

/**
 * Her listed areas of expertise, as short labels. Verified against the RMI
 * profile, then derived from the service pages so the two cannot drift.
 *
 * Not rendered as its own section any more — the card grid and /services both
 * cover it — but it is still the human-readable version of what the schema
 * declares in `knowsAbout`.
 */
export const AREAS_OF_FOCUS = SERVICES.map((c) => ({
  title: c.label,
  body: c.card.body,
  icon: c.icon,
  href: `/services/${c.slug}`,
}));

/**
 * The questions page, grouped.
 *
 * The questions stay in the reader's voice — that is who is asking, and it is
 * also what people type into a search box. The answers are the site speaking
 * about Dr. Qazi in the third person, never Dr. Qazi speaking as "I".
 *
 * Only /faq carries the FAQPage structured data. The homepage shows the first
 * five of these and links onward; publishing the same question-and-answer pairs
 * as FAQPage markup on two URLs is a duplicate signal, not two chances at a
 * rich result. Each service page has its own, distinct set.
 */
export interface Faq {
  q: string;
  a: string;
}

/* Typed rather than `as const`. A const assertion here widens to a tuple of
   nine hundred distinct string-literal types, and `flatMap` over that produces
   a union TypeScript cannot reconcile — which is a lot of machinery for a list
   of questions nothing needs to narrow. */
export const FAQ_GROUPS: {
  heading: string;
  /** Sits in the badge beside the heading on /faq. A name from lib/icons.ts. */
  icon: IconName;
  /** One line under the heading, so the sticky column is not a bare label. */
  blurb: string;
  items: Faq[];
}[] = [
  {
    heading: 'Before you book',
    icon: 'clipboard',
    blurb: 'What to expect of the process itself, before anything is booked or paid for.',
    items: [
      {
        q: 'Do I need a referral to see a psychiatrist?',
        a: 'No. You can book a consultation directly. A referral letter or previous reports from another doctor are useful if you have them, but nothing prevents you from making the appointment yourself.',
      },
      {
        q: 'Is what I say kept confidential?',
        a: 'Yes. What you say in the consulting room stays there. The narrow exceptions, where there is an immediate risk to your safety or someone else’s, are explained at the first appointment.',
      },
      {
        q: 'What is the difference between a psychiatrist and a psychologist?',
        a: 'A psychiatrist is a medical doctor who has specialised in mental illness, and can diagnose, investigate physical causes and prescribe medication. A psychologist provides psychological assessment and therapy but does not prescribe. The two often work together, and many patients need only one of them.',
      },
      {
        q: 'How do I know whether what I am experiencing is serious enough?',
        a: 'The usual threshold is duration and cost: something that has continued for weeks rather than days, and that is taking something from your work, your studies, your sleep or your relationships. If you are weighing it up at all, an assessment will answer the question faster than waiting will.',
      },
      {
        q: 'Can I bring a family member with me?',
        a: 'Yes, and many people do. You can also ask to be seen alone for part of the appointment. That is a normal request, and it causes no offence.',
      },
    ],
  },
  {
    heading: 'The appointment',
    icon: 'speech',
    blurb: 'What actually happens in the room, how long it takes and what to bring with you.',
    items: [
      {
        q: 'How long is the first appointment?',
        a: 'The first appointment is the longest, because it covers your full history: what you are experiencing, when it began, what you have already tried, and what is happening around you. Follow-ups are shorter and focus on how the plan is working.',
      },
      {
        q: 'What should I bring?',
        a: 'Any medication you are currently taking, in its packaging if possible, along with previous prescriptions, discharge summaries or test results. If you are unsure what is relevant, bring it. It is easier to set aside than to remember accurately.',
      },
      {
        q: 'What actually happens in the room?',
        a: 'A conversation. You are asked about your symptoms, your sleep, your appetite, your physical health, your family history and your circumstances. Nothing is done to you and nothing is decided before you understand it.',
      },
      {
        q: 'Which languages are consultations available in?',
        a: 'English, Urdu and Pashto.',
      },
      {
        q: 'Will I be diagnosed at the first appointment?',
        a: 'Usually, yes, with the reasoning explained in plain language. Some presentations need investigations or a second appointment before a diagnosis can be made responsibly, and where that is the case you are told so rather than given a provisional label to take home.',
      },
    ],
  },
  {
    heading: 'Treatment and medication',
    icon: 'capsule',
    blurb: 'The questions about medication that are worth asking before it is ever prescribed.',
    items: [
      {
        q: 'Will I have to take medication?',
        a: 'Not necessarily. Medication is one option among several, and it is a decision made together after the evaluation. Some patients are treated with psychotherapy alone. Nothing is started without an explanation of what it does, how long it takes to work, and what the side effects are.',
      },
      {
        q: 'Are psychiatric medications addictive?',
        a: 'Antidepressants and antipsychotics are not addictive. They do not produce craving or dose escalation, though some do need to be tapered rather than stopped abruptly. Benzodiazepines, the sedatives often bought for sleep or anxiety, genuinely are habit-forming, which is why they are prescribed briefly and with a clear end point, if at all.',
      },
      {
        q: 'How long will treatment take?',
        a: 'It depends on the condition. Many people with a first episode of depression or anxiety are well within a few months and finish treatment within the year. Long-term conditions are managed over longer periods. You are given a realistic timeline for your own situation rather than a general reassurance.',
      },
      {
        q: 'Can I stop my medication once I feel better?',
        a: 'Feeling better is evidence the treatment is working, not that it is finished. Stopping at that point is the most common cause of relapse. There is a planned end to treatment, and a supervised taper, and both are discussed with you. Please do not stop abruptly on your own.',
      },
      {
        q: 'Does Dr. Qazi see adolescents?',
        a: 'Yes. Adolescent psychiatry is one of her areas of practice, alongside adult psychiatry and female mental health.',
      },
      {
        q: 'What does a consultation cost?',
        a: RMI_BOOKABLE
          ? 'Consultation fees are set by Rehman Medical Institute and are confirmed when you book. Call the hospital UAN for the current fee and for which health plans are accepted.'
          : `Consultation fees are confirmed when you book, before anything is fixed. Message ${SALMA.name} for the current fee and for which health plans are accepted.`,
      },
    ],
  },
];

/** Every question, flattened — the FAQPage node on /faq. */
export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);

/**
 * The five carried by the homepage, which links onward to /faq.
 *
 * Picked by question rather than by index: the lookup fails loudly if a
 * question is reworded or moved between groups, where `FAQ_GROUPS[2].items[0]`
 * would silently start pointing at a different one.
 */
const pick = (q: string): Faq => {
  const found = ALL_FAQS.find((f) => f.q === q);
  if (!found) throw new Error(`FAQS: no question in FAQ_GROUPS matching "${q}"`);
  return found;
};

export const FAQS: Faq[] = [
  'Will I have to take medication?',
  'Is what I say kept confidential?',
  'How long is the first appointment?',
  'Can I bring a family member with me?',
  'Does Dr. Qazi see adolescents?',
].map(pick);

/**
 * The six carried by /appointments — the ones asked while deciding whether to
 * book, rather than the ones asked about treatment.
 *
 * Displayed only. /appointments passes no `faqs` prop to BaseLayout for the
 * same reason the homepage does not: these are a subset of /faq, and one set of
 * question-and-answer pairs marked up on two URLs is a duplicate signal.
 */
export const APPOINTMENT_FAQS: Faq[] = [
  'Do I need a referral to see a psychiatrist?',
  'What does a consultation cost?',
  'How long is the first appointment?',
  'What should I bring?',
  'Which languages are consultations available in?',
  'Can I bring a family member with me?',
].map(pick);

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

/**
 * Real routes, not anchors.
 *
 * The site began as one page and the nav pointed at sections of it. Now that
 * each subject has a page of its own, an anchor would land a visitor in a
 * summary of a page that already exists — and, more to the point, a section
 * anchor cannot rank, carry its own title, or be linked to from anywhere else.
 * The homepage still carries all five subjects in short form, and each of those
 * sections links onward to the page below.
 */
export const NAV_LINKS = [
  /* Home is also the wordmark in the centre of the bar. Named here as well
     because the mark reads as branding rather than as a link to a lot of
     visitors, and the mobile menu has no mark in it at all. */
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  /* Next to About, not next to Appointments. The clinic is part of who she is
     rather than part of how you book — and the name is the reason the tab
     exists, so it wants to be read straight after the person it belongs to. */
  { href: '/salma', label: 'Clinic' },
  { href: '/services', label: 'Services' },
  { href: '/appointments', label: 'Appointments' },
  { href: '/faq', label: 'Questions' },
] as const;

/** The footer's four columns. Legal sits on its own line beneath them. */
export const FOOTER_NAV = [
  {
    heading: 'Practice',
    links: [
      { href: '/about', label: 'About Dr. Qazi' },
      { href: '/salma', label: SALMA.name },
      { href: '/about#teaching', label: 'Teaching and advocacy' },
      { href: '/appointments', label: 'Book an appointment' },
      { href: '/faq', label: 'Common questions' },
      { href: '/contact', label: 'Contact and directions' },
    ],
  },
  {
    heading: 'Services',
    links: SERVICES.slice(0, 5).map((c) => ({
      href: `/services/${c.slug}`,
      label: c.label,
    })),
  },
  {
    heading: 'Also treated',
    links: [
      ...SERVICES.slice(5).map((c) => ({
        href: `/services/${c.slug}`,
        label: c.label,
      })),
      { href: '/services', label: 'All services' },
    ],
  },
] as const;

export const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy policy' },
  { href: '/terms', label: 'Terms & medical disclaimer' },
] as const;

/* --------------------------------------------------------------------------
   SEO
   -------------------------------------------------------------------------- */

export const SEO = {
  title: 'Dr. Shandana Qazi | Consultant Psychiatrist in Peshawar',
  titleTemplate: '%s | Dr. Shandana Qazi, Psychiatrist Peshawar',
  /* Every description on the site is written to fit inside the ~160 characters
     Google renders. Longer text is still read for matching, but the tail never
     appears in the result — so the tail is never where the useful part goes.
     Both branches of VENUE_PHRASE were counted against that budget; the longer
     of the two lands at about 158. */
  description: `Dr. Shandana Qazi, MBBS, FCPS, Consultant Psychiatrist at ${VENUE_PHRASE}. Depression, anxiety, trauma and women’s mental health.`,
  ogImageAlt: `Dr. Shandana Qazi, Consultant Psychiatrist at ${VENUE_PHRASE}`,
} as const;

/**
 * Per-page title and description.
 *
 * Written out in full rather than run through `titleTemplate`: a template that
 * appends the practice name to an already-descriptive title pushes every page
 * past the ~60 characters Google displays, and the part that gets truncated is
 * always the end. Each of these is written to fit, with the target query at the
 * front and the location in it.
 */
export const PAGE_SEO = {
  about: {
    title: 'About Dr. Shandana Qazi | Psychiatrist, Peshawar',
    description: `Dr. Shandana Qazi, MBBS and FCPS in Psychiatry, practises at ${VENUE_PHRASE}. Qualifications, teaching posts and approach.`,
  },
  /**
   * The clinic page.
   *
   * The nav and page heading use "Clinic"; metadata retains the full practice name.
   */
  salma: {
    title: 'Salma Psychiatric Clinic | Dr. Shandana Qazi, Peshawar',
    description:
      'Salma Psychiatric Clinic, the private practice of Dr. Shandana Qazi, Consultant Psychiatrist in Peshawar. Learn about the clinic and its care.',
  },
  services: {
    title: 'Services | Psychiatrist in Peshawar',
    description:
      'Services offered by Dr. Shandana Qazi, Consultant Psychiatrist in Peshawar: depression, anxiety, stress, insomnia, PTSD, OCD and women’s mental health.',
  },
  /**
   * The page that describes the appointment itself. It answers "what happens
   * in the room", where /appointments answers "how do I book one" — kept apart
   * in the titles so the two do not chase the same query.
   */
  treatment: {
    title: 'What Happens at a Psychiatric Appointment | Dr. S. Qazi',
    description:
      'What a first appointment with Dr. Shandana Qazi actually involves: the assessment, what treatment consists of, what to bring, and how decisions are made together.',
  },
  faq: {
    title: 'Questions About Seeing a Psychiatrist | Dr. S. Qazi',
    description:
      'Answers to the questions people ask before a first psychiatric appointment in Peshawar: confidentiality, medication, cost and bringing family.',
  },
  /**
   * The booking page. /contact below deliberately no longer competes for the
   * same query — before /appointments existed it was titled "Book an
   * Appointment" too, and two pages on one site chasing one phrase split the
   * signal between them rather than doubling it. This one owns booking;
   * /contact owns the address and the directions.
   */
  appointments: {
    title: 'Appointments: In Person & Online | Dr. S. Qazi',
    description: `Book an appointment with Dr. Shandana Qazi, psychiatrist in Peshawar: in person at ${VENUE_PHRASE}, or online by video. Hours and fees.`,
  },
  contact: {
    title: 'Contact & Appointments | Psychiatrist in Peshawar',
    description: `Contact Dr. Shandana Qazi, Consultant Psychiatrist, at ${VENUE_PHRASE}. Arrange appointments on WhatsApp and confirm the clinic location.`,
  },
  privacy: {
    title: 'Privacy Policy | Dr. Shandana Qazi',
    description:
      'How this website handles information, what it does and does not collect, and how patient confidentiality is treated at the practice.',
  },
  terms: {
    title: 'Terms of Use & Medical Disclaimer | Dr. Shandana Qazi',
    description:
      'Terms of use for drshandanaqazi.com and the medical disclaimer governing the general health information published on it.',
  },
  notFound: {
    title: 'Page Not Found | Dr. Shandana Qazi',
    description: 'That page does not exist. Links to the services offered, the practice, and booking.',
  },
} as const;
