/* ==========================================================================
   SERVICES — the content layer for /services and /services/[slug]
   --------------------------------------------------------------------------
   `src/consts.ts` holds the *facts* about the practice. This file holds the
   *content* about the services offered, and it is the single source for:

     - the six photographed cards on the homepage  (featured: true)
     - the full grid on /services
     - one generated page per entry at /services/<slug>
     - `knowsAbout` in the Physician schema
     - a MedicalWebPage + MedicalCondition node on each service page
     - a FAQPage node on each service page

   Every entry is general patient information, written to be recognisable
   rather than diagnostic. Nothing here tells a reader what they have, and
   nothing here recommends a specific treatment — both are decisions that
   belong in the consulting room, and every page says so.

   The eight areas of expertise come from her RMI consultant profile. Adolescent
   mental health is the ninth entry: her profile names adolescent psychiatry as
   an area of practice, so it is a page rather than a sub-heading.
   ========================================================================== */

import type { IconName } from '../lib/icons';
/* The bookable venue, by name only. Imported from data/practice rather than
   from consts, because consts imports THIS file and the other direction would
   be a cycle.

   Name only, not VENUE_PHRASE: every description on a service page already
   opens with "in Peshawar", and the full phrase ends with the city too — so
   the pair printed Peshawar twice in one sentence and pushed the description
   past the ~160 characters Google renders. */
import { VENUE_NAME } from './practice';

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  /** URL segment. Chosen for what people search, not for clinical tidiness. */
  slug: string;
  /** Short name — related links, breadcrumbs, the conditions grid. */
  label: string;
  icon: IconName;
  /** Key into the image map in ServiceMedia.astro. */
  image: string;
  /** True for the six cards carried by the homepage grid. */
  featured: boolean;

  /** Card copy. `titleEm` is the one emphasised word — see global.css. */
  card: { title: string; titleEm: string; body: string };

  seoTitle: string;
  seoDescription: string;

  /** Page headline, split so one word can take the emphasis colour. */
  h1: { text: string; em: string };
  lede: string;

  /** Opening section. Two or three paragraphs, plain language. */
  intro: string[];

  /** "What it can look like" — the recognition list. */
  signs: { intro: string; items: string[] };

  /** When it is worth booking rather than waiting. */
  whenToSeek: string[];

  /** How it is approached in clinic. Three blocks, in the order they happen. */
  treatment: { title: string; body: string }[];

  /**
   * Shown as a bordered callout above the booking band. Present only where an
   * untreated presentation carries real risk — not on every page, or it stops
   * being read.
   */
  urgent: string | null;

  faqs: ServiceFaq[];
  related: string[];

  /** For the MedicalCondition node. */
  schema: { name: string; alternateName: string[] };
}

export const SERVICES: Service[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'depression',
    label: 'Depression',
    icon: 'cloud',
    image: 'depression',
    featured: true,
    card: {
      title: 'Depression and low',
      titleEm: 'mood',
      body: 'Persistent low mood, loss of interest, and the exhaustion that comes with both.',
    },

    seoTitle: 'Depression Treatment in Peshawar | Dr. Shandana Qazi',
    seoDescription:
      `Depression treatment in Peshawar with Dr. Shandana Qazi, Consultant Psychiatrist at ${VENUE_NAME}. Assessment, therapy and medication.`,

    h1: { text: 'Depression treatment in', em: 'Peshawar' },
    lede:
      'Low mood that has stopped lifting on its own is a medical condition, not a failure of will. It is also one of the most treatable conditions in psychiatry.',

    intro: [
      'Depression is more than a bad week. It is a sustained change in mood, energy, sleep and interest that lasts most of the day, nearly every day, for at least two weeks, and it does not shift simply because the circumstances that started it have passed.',
      'People often arrive at the clinic having already tried everything they were told to try: more prayer, more exercise, more discipline, a holiday, a change of job. When those have not worked, the usual conclusion is that the problem is personal weakness. It is not. Depression changes sleep, appetite, concentration and motivation through mechanisms nobody chooses, and it responds to treatment.',
      `Dr. Shandana Qazi assesses and treats depression in adults and adolescents at ${VENUE_NAME}. The first step is always a proper assessment, because several very different things, from thyroid disease to grief to bipolar disorder, can look like depression from the outside and need entirely different treatment.`,
    ],

    signs: {
      intro:
        'Depression rarely announces itself as sadness. More often it is noticed by the people around you before it is named by the person living with it.',
      items: [
        'Low mood or emptiness that is present most of the day, most days',
        'Losing interest in things that used to matter: work, family, food, faith, company',
        'Exhaustion that sleep does not repair, and tasks that used to be automatic taking real effort',
        'Sleeping far more or far less than usual, or waking hours before you need to',
        'Appetite and weight changing noticeably in either direction',
        'Difficulty concentrating, remembering, or making even small decisions',
        'Persistent guilt, or a sense of being a burden to your family',
        'Physical symptoms with no clear cause: headaches, body aches, stomach trouble',
        'Thoughts that life is not worth continuing',
      ],
    },

    whenToSeek: [
      'The low mood has lasted more than two weeks and is not improving',
      'It is affecting your work, your studies, or your relationships at home',
      'You have lost interest in nearly everything, including things you used to protect',
      'You have tried to manage it alone and the effort itself has become exhausting',
      'You are having thoughts of harming yourself, in which case do not wait',
    ],

    treatment: [
      {
        title: 'A proper assessment first',
        body: 'A full history: the symptoms, when they started, what was happening around them, your physical health, your medications, and anything in the family history. Where a physical cause is possible (thyroid function and anaemia are the common ones), that is checked rather than assumed. A diagnosis is only useful if it is the right one.',
      },
      {
        title: 'Psychotherapy, medication, or both',
        body: 'Mild to moderate depression is often treated with structured talking therapy alone. Where medication is indicated, an antidepressant is chosen for your particular symptom pattern and your other health conditions, and you are told before you start what it does, how many weeks it takes to work, and what the side effects are likely to be.',
      },
      {
        title: 'Review, adjust, and a plan for stopping',
        body: 'Antidepressants are reviewed at follow-up and adjusted if they are not working. Staying on an ineffective dose for a year is a common and avoidable outcome. When you are well, there is a plan for how long treatment continues and how it is tapered safely, rather than stopped suddenly.',
      },
    ],

    urgent:
      'If you are having thoughts of ending your life, or you are worried about someone who is, this is an emergency and it should be treated as one. Go to the emergency department at Rehman Medical Institute, or call the hospital UAN, rather than waiting for a scheduled appointment.',

    faqs: [
      {
        q: 'Is depression treatable without medication?',
        a: 'Often, yes. Mild and moderate depression frequently responds to structured psychotherapy on its own, and many patients are treated that way. Medication becomes more important as severity increases, or where previous episodes have responded well to it. It is a decision made together after the assessment, not a default.',
      },
      {
        q: 'How long do antidepressants take to work?',
        a: 'Most people notice sleep and appetite settling within one to two weeks, while the change in mood itself usually takes four to six weeks to become clear. That gap is the reason so many people stop early and conclude the medication failed. The expected timeline is explained before anything is started.',
      },
      {
        q: 'Will I be on medication for life?',
        a: 'For most people, no. A first episode of depression is typically treated for six to twelve months after recovery, then tapered under supervision. Longer treatment is considered where episodes have been recurrent or severe, and that reasoning is discussed with you rather than assumed.',
      },
      {
        q: 'Can I be treated for depression without my family knowing?',
        a: 'Yes. What you discuss in the consulting room is confidential, and whether to involve your family is your decision. Many patients find it helps to bring someone; many prefer not to. Either is a normal choice.',
      },
    ],

    related: ['anxiety-and-panic', 'sleep-problems', 'womens-mental-health'],
    schema: {
      name: 'Depression',
      alternateName: ['Major depressive disorder', 'Clinical depression', 'Low mood'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'anxiety-and-panic',
    label: 'Anxiety and panic',
    icon: 'pulse',
    image: 'anxiety',
    featured: true,
    card: {
      title: 'Anxiety and',
      titleEm: 'panic',
      body: 'Constant worry, physical tension, and panic attacks that arrive without warning.',
    },

    seoTitle: 'Anxiety & Panic Attack Treatment, Peshawar | Dr. S. Qazi',
    seoDescription:
      `Treatment for anxiety, panic attacks and constant worry in Peshawar. Dr. Shandana Qazi, Consultant Psychiatrist at ${VENUE_NAME}.`,

    h1: { text: 'Anxiety and panic attack', em: 'treatment' },
    lede:
      'Anxiety becomes a medical problem when the alarm stops switching off, when the worry runs regardless of what is actually happening in front of you.',

    intro: [
      'Everyone worries. Anxiety becomes a condition worth treating when the worrying is out of proportion to the situation, is difficult to control, and has started to cost you something: sleep, concentration, work, or the things you have quietly stopped doing to avoid it.',
      'Anxiety is also the condition most often mistaken for a physical illness. A racing heart, a tight chest, breathlessness and dizziness are genuine symptoms, and people frequently reach a psychiatrist only after a cardiology workup has come back clear. That sequence is normal, and the relief of being told the symptoms are real but the heart is not the problem is often the first useful thing that happens.',
      `Dr. Shandana Qazi treats generalised anxiety, panic disorder, social anxiety and health anxiety in adults and adolescents, at ${VENUE_NAME}.`,
    ],

    signs: {
      intro:
        'Anxiety shows up in the body at least as much as in the mind, which is why it is so often missed.',
      items: [
        'Worry that runs most days and is hard to switch off or reason with',
        'A racing or pounding heart, chest tightness, or breathlessness with no cardiac cause',
        'Panic attacks: sudden intense fear peaking within minutes, often with a sense of dying or losing control',
        'Constant muscle tension, jaw clenching, headaches, or trembling',
        'Stomach trouble, nausea, or needing the bathroom urgently before stressful events',
        'Avoiding places, gatherings or situations where a panic attack has happened before',
        'Difficulty falling asleep because the mind will not settle',
        'Being on edge, easily startled, and irritable with the people closest to you',
      ],
    },

    whenToSeek: [
      'The worry is present most days and you cannot reason your way out of it',
      'You have had panic attacks, or you are now afraid of having one',
      'You have started avoiding places, people or situations to stay safe',
      'Physical investigations have come back normal but the symptoms have not stopped',
      'You are using sleeping tablets, painkillers or anything else to take the edge off',
    ],

    treatment: [
      {
        title: 'Separating anxiety from everything that imitates it',
        body: 'Thyroid disease, anaemia, certain medications, heavy caffeine use and withdrawal states all produce anxiety symptoms, and so does depression. The assessment establishes which anxiety disorder is present, if any, and rules out the physical causes that would need a different treatment entirely.',
      },
      {
        title: 'Therapy that targets the mechanism',
        body: 'Anxiety is maintained by avoidance and by the way physical sensations are interpreted, and both respond to structured cognitive behavioural work. That includes what to do during a panic attack, which is a practical skill and is taught as one. For many patients this is the whole of the treatment.',
      },
      {
        title: 'Medication where it is needed, prescribed carefully',
        body: 'Where medication is indicated, an SSRI is usually the evidence-based starting point and takes several weeks to act. Benzodiazepines relieve anxiety within the hour, which is exactly why they are habit-forming. They are used briefly and with a clear end point, or not at all, and never as the long-term plan.',
      },
    ],

    urgent: null,

    faqs: [
      {
        q: 'Are panic attacks dangerous?',
        a: 'A panic attack is intensely unpleasant and genuinely frightening, but it is not physically dangerous and it does not cause a heart attack. Attacks peak within about ten minutes and subside. That said, chest pain should be assessed medically the first time it occurs. Panic is a diagnosis made after the dangerous causes have been excluded, not instead of excluding them.',
      },
      {
        q: 'Do I have to take medication for anxiety?',
        a: 'Not necessarily. A great deal of anxiety is treated with psychotherapy alone, particularly when it is caught before avoidance has taken over daily life. Medication is discussed where symptoms are severe, where therapy alone has not been enough, or where depression is present alongside the anxiety.',
      },
      {
        q: 'Why did my heart tests come back normal?',
        a: 'Because the symptoms are produced by the body\'s alarm response rather than by disease of the heart. Adrenaline genuinely raises your heart rate and tightens your chest. Normal cardiac results do not mean the symptoms were imagined; they mean the cause lies elsewhere and can be treated.',
      },
      {
        q: 'Is social anxiety the same as being shy?',
        a: 'No. Shyness is a temperament. Social anxiety is a fear of being judged that is strong enough to make you avoid classes, work, weddings or phone calls, and it responds well to treatment. The distinction is the cost, not the feeling.',
      },
    ],

    related: ['depression', 'stress-and-burnout', 'ocd'],
    schema: {
      name: 'Anxiety disorder',
      alternateName: ['Generalised anxiety disorder', 'Panic disorder', 'Social anxiety disorder'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'stress-and-burnout',
    label: 'Stress and burnout',
    icon: 'hourglass',
    image: 'stress',
    featured: true,
    card: {
      title: 'Stress and',
      titleEm: 'burnout',
      body: 'Work, study and family pressure that has stopped being something you can absorb.',
    },

    seoTitle: 'Stress & Burnout Help in Peshawar | Dr. Shandana Qazi',
    seoDescription:
      'Help with chronic stress and burnout in Peshawar. Assessment and treatment from Dr. Shandana Qazi, Consultant Psychiatrist at Rehman Medical Institute.',

    h1: { text: 'Stress and burnout', em: 'help' },
    lede:
      'Pressure is normal. What is not normal is running on it for so long that rest no longer restores anything.',

    intro: [
      'Stress becomes clinically important at the point where it stops being something you recover from between demands. Burnout is the state on the far side of that line: emotional exhaustion, a growing detachment from work or family that used to matter, and a sense that nothing you do is any good.',
      'It is common among doctors, teachers, students preparing for exams, people carrying a household alone, and anyone who has been a carer for a long time. It is also commonly dismissed, by the person living it more than by anyone else, because the demands causing it are real and are not going anywhere.',
      'The clinical question is not whether your circumstances are difficult. It is whether what you are experiencing has crossed into a depressive or anxiety disorder that needs treating in its own right, because chronic stress is a well-established precursor to both.',
    ],

    signs: {
      intro:
        'Burnout builds slowly enough that most people only recognise it in hindsight.',
      items: [
        'Exhaustion that a weekend, or even a holiday, no longer fixes',
        'Dreading the day before it starts, and counting hours until it ends',
        'Becoming cynical or detached about work, study or people you used to care about',
        'Doing more and achieving less, with concentration and memory noticeably worse',
        'Irritability, a short temper, and arguments at home that did not used to happen',
        'Headaches, gut problems, tension in the neck and shoulders, frequent minor illness',
        'Sleep that is broken, or a mind that starts working the moment you lie down',
        'Relying on caffeine, nicotine, food or sleeping tablets to get through the cycle',
      ],
    },

    whenToSeek: [
      'The exhaustion has lasted months and rest is no longer touching it',
      'Your performance at work or in your studies has visibly dropped',
      'You have started avoiding responsibilities you would normally meet',
      'Low mood, anxiety or hopelessness have joined the tiredness',
      'You are using substances or sedatives to keep functioning',
    ],

    treatment: [
      {
        title: 'Establishing what this actually is',
        body: 'Burnout, depression, an anxiety disorder and a physical illness such as anaemia or thyroid disease overlap heavily and are treated differently. The assessment separates them, because treating exhaustion as depression when it is a thyroid problem, or the reverse, wastes months.',
      },
      {
        title: 'Changing the load, not just tolerating it',
        body: 'Where the problem is genuinely the demands, therapy focuses on what can realistically be changed: boundaries, sleep, workload, and the beliefs that make refusing anything feel impossible. Advice to "reduce stress" without a plan for how is not treatment, and it is not what is offered.',
      },
      {
        title: 'Treating what has developed on top of it',
        body: 'Where chronic stress has tipped into a depressive or anxiety disorder, that is treated on its own terms (with therapy, medication, or both) while the underlying load is addressed. Recovery from burnout without addressing either is usually temporary.',
      },
    ],

    urgent: null,

    faqs: [
      {
        q: 'Is burnout a medical diagnosis?',
        a: 'Burnout is classified as an occupational phenomenon rather than a medical condition in its own right. That distinction matters clinically, because what often needs treating is the depression or anxiety disorder that has developed alongside it, and those are diagnoses, and they respond to treatment.',
      },
      {
        q: 'Do I need to leave my job to recover?',
        a: 'Usually not. Most people recover while remaining in the same role, once sleep is restored, the load is renegotiated where it can be, and any depression or anxiety present is treated. Major life decisions made in the middle of exhaustion are rarely the ones people would make once well.',
      },
      {
        q: 'Can stress cause physical symptoms?',
        a: 'Yes, and they are real symptoms, not imagined ones. Sustained stress raises cortisol and adrenaline, and headaches, gut disturbance, muscle pain and lowered immunity follow from that. New or severe physical symptoms should still be assessed medically before they are attributed to stress.',
      },
    ],

    related: ['anxiety-and-panic', 'depression', 'sleep-problems'],
    schema: {
      name: 'Burnout',
      alternateName: ['Chronic stress', 'Occupational burnout', 'Adjustment disorder'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'sleep-problems',
    label: 'Sleep problems',
    icon: 'moon',
    image: 'sleep',
    featured: true,
    card: {
      title: 'Sleep',
      titleEm: 'difficulties',
      body: 'Trouble falling asleep, staying asleep, or waking with no rest behind you.',
    },

    seoTitle: 'Insomnia & Sleep Problems, Peshawar | Dr. Shandana Qazi',
    seoDescription:
      `Treatment for insomnia and disturbed sleep in Peshawar, without automatic sleeping tablets. Dr. Shandana Qazi at ${VENUE_NAME}.`,

    h1: { text: 'Insomnia and sleep', em: 'problems' },
    lede:
      'Sleeping badly for a few nights is ordinary. Sleeping badly for months changes your mood, your memory and your health, and it has causes that can be found.',

    intro: [
      'Insomnia is difficulty falling asleep, staying asleep, or waking far too early, happening at least three nights a week, for three months or more, in circumstances where sleep should have been possible. The definition matters, because chronic insomnia is treated differently from a bad fortnight.',
      'Sleep problems are rarely a standalone complaint. Insomnia is one of the most reliable early signs of depression, one of the most common symptoms of anxiety, and a frequent consequence of chronic pain, shift work, and untreated sleep apnoea. Treating the sleep without asking what is driving it usually means treating it repeatedly.',
      'The other reason to have insomnia assessed properly is what people reach for in the meantime. Sleeping tablets bought without a prescription work well for a fortnight, lose effect, and then become difficult to stop, a pattern seen often, and one that is much easier to avoid than to unwind.',
    ],

    signs: {
      intro: 'Poor sleep is easiest to recognise by what the following day looks like.',
      items: [
        'Lying awake for an hour or more after going to bed, most nights',
        'Waking repeatedly through the night, or waking hours early and not getting back to sleep',
        'Waking unrefreshed, however many hours you were technically in bed',
        'Daytime exhaustion, poor concentration, and memory that has become unreliable',
        'Irritability and a noticeably shorter fuse',
        'Dreading bedtime, or associating the bed with lying awake rather than sleeping',
        'Needing a tablet, or something else, to get to sleep at all',
        'Loud snoring, or being told you stop breathing in your sleep',
      ],
    },

    whenToSeek: [
      'Poor sleep has continued for more than three months',
      'It is affecting your work, your driving, or your mood during the day',
      'You have been using sleeping tablets for more than a few weeks',
      'Low mood or anxiety have appeared alongside the sleeplessness',
      'You snore heavily, or someone has noticed you stop breathing at night',
    ],

    treatment: [
      {
        title: 'Finding what is keeping you awake',
        body: 'The history covers your sleep pattern, your routine, caffeine and nicotine, shift work, pain, medication, and any low mood or anxiety. Where obstructive sleep apnoea is suspected (heavy snoring, witnessed pauses in breathing, daytime sleepiness), that is referred for the right investigation rather than treated with sedatives.',
      },
      {
        title: 'CBT-I before tablets',
        body: 'Cognitive behavioural therapy for insomnia is the first-line treatment for chronic insomnia in every major guideline, and it outperforms medication over the long term. It is practical work: sleep scheduling, stimulus control, and undoing the habits that have grown up around lying awake.',
      },
      {
        title: 'Medication used briefly, and with an exit',
        body: 'Where something is needed in the short term, it is prescribed for a defined period with a plan for stopping. If you are already dependent on sleeping tablets, that is common, it is treatable, and a supervised taper is far safer and far more comfortable than stopping on your own.',
      },
    ],

    urgent: null,

    faqs: [
      {
        q: 'Are sleeping tablets safe?',
        a: 'For short, defined periods and under supervision, they have a place. The problem is duration: most sedatives lose effectiveness within weeks while dependence builds, and stopping them abruptly can cause rebound insomnia worse than the original complaint. They are used with a plan for coming off, not as the treatment itself.',
      },
      {
        q: 'What is CBT-I?',
        a: 'Cognitive behavioural therapy for insomnia, a structured, time-limited treatment that changes sleep timing, breaks the association between bed and wakefulness, and addresses the anxiety about sleep that keeps the cycle running. It is the first-line treatment for chronic insomnia and its effects outlast medication.',
      },
      {
        q: 'Does poor sleep cause depression, or does depression cause poor sleep?',
        a: 'Both, which is why sleep is asked about carefully. Insomnia frequently precedes a depressive episode by weeks, and depression reliably disturbs sleep once it arrives. Treating the sleep problem is often part of treating the depression, and sometimes prevents one.',
      },
    ],

    related: ['depression', 'anxiety-and-panic', 'stress-and-burnout'],
    schema: {
      name: 'Insomnia',
      alternateName: ['Chronic insomnia', 'Sleep disturbance', 'Sleeplessness'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'trauma-and-ptsd',
    label: 'Trauma and PTSD',
    icon: 'shield',
    image: 'trauma',
    featured: true,
    card: {
      title: 'Trauma-related',
      titleEm: 'distress',
      body: 'Difficult events that are still shaping how you sleep, feel and relate to people.',
    },

    seoTitle: 'PTSD & Trauma Treatment in Peshawar | Dr. Shandana Qazi',
    seoDescription:
      'PTSD and trauma treatment in Peshawar. Dr. Shandana Qazi, Consultant Psychiatrist at Rehman Medical Institute and a certified Psychological First Aid practitioner.',

    h1: { text: 'Trauma and PTSD', em: 'treatment' },
    lede:
      'Some events do not stay in the past on their own. When they keep returning, that is a recognised condition with recognised treatments.',

    intro: [
      'Post-traumatic stress disorder can follow any event that involved a threat to life or safety: an accident, a bomb blast, violence, a medical emergency, bereavement in traumatic circumstances, or a difficult birth. It is not a sign of a weak character, and it is not a moral failure. It is what happens when the memory of an event is stored in a way that keeps it live.',
      'Not everyone who survives something terrible develops PTSD, and most acute distress in the first month settles without treatment. What makes it a disorder is persistence: intrusive memories, avoidance, a nervous system that stays switched on, and a change in how you see yourself and other people, continuing beyond a month and interfering with your life.',
      'Dr. Qazi is a certified Psychological First Aid practitioner and treats trauma-related presentations in adults and adolescents. Treatment moves at a pace you set. Nobody is required to describe what happened before they are ready to.',
    ],

    signs: {
      intro:
        'PTSD is often recognised not by the memories but by everything arranged around avoiding them.',
      items: [
        'Intrusive memories, flashbacks, or the event replaying without being invited',
        'Nightmares, and sleep that is broken or actively avoided',
        'Avoiding places, people, journeys or conversations connected to what happened',
        'Feeling constantly on guard, easily startled, unable to sit with your back to a door',
        'Irritability or anger that arrives faster and larger than the situation warrants',
        'Emotional numbness, or a sense of detachment from people you love',
        'Persistent guilt or shame, including about having survived',
        'Gaps in memory for parts of the event itself',
      ],
    },

    whenToSeek: [
      'Symptoms have continued for more than a month after the event',
      'You are avoiding significant parts of ordinary life to stay away from reminders',
      'Sleep and nightmares have become the main problem',
      'You are drinking, using substances, or using sedatives to cope',
      'You are having thoughts of harming yourself, in which case do not wait',
    ],

    treatment: [
      {
        title: 'Stabilising first',
        body: 'Where sleep has collapsed or distress is overwhelming, that is addressed before anything else. Trauma-focused work is not started on a nervous system that has no reserves, and there is no clinical benefit in forcing an account of the event early.',
      },
      {
        title: 'Trauma-focused psychotherapy',
        body: 'The evidence-based treatments for PTSD are psychological: trauma-focused cognitive behavioural therapy and EMDR. Both work on how the memory is stored and on the avoidance that maintains it, and both are structured and time-limited rather than open-ended.',
      },
      {
        title: 'Medication where it helps',
        body: 'Medication is not first-line for PTSD itself, but it has a clear role where depression is present alongside it, where sleep and nightmares are severe, or where distress is too high for therapy to begin. It is used to make the psychological work possible, not as a substitute for it.',
      },
    ],

    urgent:
      'If you are in immediate danger, or you are having thoughts of ending your life, this is an emergency. Go to the emergency department at Rehman Medical Institute, or call the hospital UAN, rather than waiting for an appointment.',

    faqs: [
      {
        q: 'Will I have to describe what happened?',
        a: 'Not at the first appointment, and not before you are ready. The assessment needs to know that something happened and how it is affecting you now. The detail belongs to trauma-focused therapy later, and only at a pace you set.',
      },
      {
        q: 'How long after an event should I wait before seeking help?',
        a: 'Intense distress in the first few weeks is a normal reaction and often settles on its own. If symptoms are still present a month afterwards, or if you are not functioning at all in the meantime, it is worth being assessed rather than waiting longer.',
      },
      {
        q: 'Can PTSD be treated years after the event?',
        a: 'Yes. Trauma-focused therapies are effective for symptoms that have been present for years or decades. Time since the event changes very little about how treatable it is.',
      },
    ],

    related: ['depression', 'anxiety-and-panic', 'sleep-problems'],
    schema: {
      name: 'Post-traumatic stress disorder',
      alternateName: ['PTSD', 'Trauma-related distress', 'Acute stress reaction'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'womens-mental-health',
    label: "Women's mental health",
    icon: 'heart',
    image: 'female-mental',
    featured: true,
    card: {
      title: 'Female mental',
      titleEm: 'health',
      body: 'Including perinatal and postnatal care, with attention to what women carry at home.',
    },

    seoTitle: "Women's Mental Health, Peshawar | Dr. Shandana Qazi",
    seoDescription:
      "Women's and perinatal mental health in Peshawar: postnatal depression, pregnancy and menopause. Dr. Shandana Qazi, female Consultant Psychiatrist, RMI.",

    h1: { text: "Women's and perinatal mental", em: 'health' },
    lede:
      'A particular focus of Dr. Qazi’s practice: the points in a woman’s life where mental health and physical health are hardest to separate.',

    intro: [
      'Women’s mental health is not a softer version of general psychiatry. Pregnancy, the weeks after birth, the menstrual cycle and the menopausal transition each change the clinical picture: what the symptoms mean, which treatments are safe, and how quickly a decision needs to be made.',
      'Alongside that sits everything that is not biological: carrying a household, caring for parents and children at once, and a widely held expectation that difficulty will be absorbed quietly. In Peshawar, as elsewhere, that expectation is often the reason a woman arrives at the clinic several years later than she might have.',
      'Dr. Shandana Qazi is a female consultant psychiatrist and gives particular attention to female mental health, including perinatal and postnatal care. Consultations are available in English, Urdu and Pashto, and you are welcome to be seen alone, or with a family member, whichever you prefer.',
    ],

    signs: {
      intro:
        'Some presentations are specific to these life stages, and some are ordinary conditions arriving at a moment that changes how they must be handled.',
      items: [
        'Low mood, anxiety or panic during pregnancy',
        'Postnatal depression: persistent low mood, exhaustion, guilt, or difficulty bonding with the baby',
        'Intrusive and frightening thoughts about harm coming to the baby',
        'Severe mood changes in the days before a period, month after month',
        'Anxiety, low mood, irritability or insomnia through the menopausal transition',
        'Distress following pregnancy loss, infertility treatment, or a traumatic birth',
        'Anxiety or depression in the context of a difficult or unsafe home situation',
        'Being told repeatedly that what you are experiencing is only hormones, or only tiredness',
      ],
    },

    whenToSeek: [
      'Low mood or anxiety in pregnancy, or at any point in the first year after birth',
      'Mood symptoms that recur in a clear pattern with your cycle',
      'You are already on psychiatric medication and are pregnant or planning to be',
      'Symptoms are affecting your ability to care for yourself or your children',
      'Confusion, severe agitation or unusual beliefs after childbirth: this is urgent',
    ],

    treatment: [
      {
        title: 'Assessment that accounts for the stage you are at',
        body: 'Pregnancy, breastfeeding, the menstrual cycle and the menopausal transition all change both the differential diagnosis and the treatment options. Thyroid disease and anaemia are especially common after childbirth and are checked rather than assumed.',
      },
      {
        title: 'Treatment decisions made with the risks on the table',
        body: 'In pregnancy and breastfeeding, the risks of a medication and the risks of untreated illness are both real, and neither is decided for you. Where medication is appropriate, options with the best-established safety data are chosen, and the reasoning is explained fully before anything is started.',
      },
      {
        title: 'Psychotherapy, and the practical situation around you',
        body: 'Structured therapy is first-line for mild and moderate perinatal depression and anxiety. Treatment also takes account of sleep, support at home, and the realities of your household. For a mother of a newborn, those are clinical factors, not background detail.',
      },
    ],

    urgent:
      'Confusion, agitation, hallucinations or unusual beliefs in the days or weeks after childbirth may indicate postpartum psychosis. It is rare, it is a medical emergency, and it is highly treatable. Go to the emergency department at Rehman Medical Institute immediately rather than waiting for an appointment.',

    faqs: [
      {
        q: 'Is it safe to take psychiatric medication during pregnancy?',
        a: 'Some medications have much better safety data in pregnancy than others, and untreated depression carries its own risks for both mother and baby. The decision is made case by case with the evidence explained to you, and it is never made by stopping medication abruptly, which is a common and avoidable harm.',
      },
      {
        q: 'How is postnatal depression different from the baby blues?',
        a: 'The baby blues are common, peak around three to five days after delivery, and settle within two weeks without treatment. Postnatal depression is more persistent and more disabling, can begin any time in the first year, and does not resolve on its own. It needs assessment and treatment.',
      },
      {
        q: 'Can I see a female psychiatrist?',
        a: 'Yes. Dr. Shandana Qazi is a female consultant psychiatrist, and for many patients and families that is the deciding factor in seeking help at all. Consultations are available in English, Urdu and Pashto.',
      },
      {
        q: 'Can I bring my baby to the appointment?',
        a: 'Yes. Attending with an infant is expected in perinatal care and causes no difficulty.',
      },
    ],

    related: ['depression', 'anxiety-and-panic', 'trauma-and-ptsd'],
    schema: {
      name: "Women's mental health",
      alternateName: [
        'Postnatal depression',
        'Perinatal mental health',
        'Premenstrual dysphoric disorder',
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'ocd',
    label: 'OCD',
    icon: 'loop',
    image: 'ocd',
    featured: false,
    card: {
      title: 'Obsessive–compulsive',
      titleEm: 'symptoms',
      body: 'Intrusive thoughts and the rituals that build up around keeping them quiet.',
    },

    seoTitle: 'OCD Treatment in Peshawar | Dr. Shandana Qazi',
    seoDescription:
      `OCD treatment in Peshawar: intrusive thoughts, checking and washing. Dr. Shandana Qazi, Consultant Psychiatrist at ${VENUE_NAME}.`,

    h1: { text: 'OCD treatment in', em: 'Peshawar' },
    lede:
      'Obsessive–compulsive disorder is not a preference for tidiness. It is an intrusive thought you cannot dismiss, and a ritual that buys an hour of relief at a rising price.',

    intro: [
      'OCD has two halves. Obsessions are unwanted thoughts, images or urges that arrive repeatedly and cause real distress. Compulsions are what you do to make that distress stop: washing, checking, counting, repeating, praying to a fixed formula, or asking for reassurance. The relief is genuine, and it is brief, and the cycle tightens each time it runs.',
      'The content of the obsessions is frequently the reason people do not seek help for years. Intrusive thoughts about harm, about contamination, about blasphemy or about sexuality are common in OCD, and they are experienced as horrifying precisely because they are the opposite of what the person values. Having the thought is not the same as wanting it, and it is a recognised symptom rather than evidence of character.',
      'OCD responds well to treatment. The difficulty is almost never the response rate. It is how long people wait before asking.',
    ],

    signs: {
      intro:
        'The clinical threshold is time and cost: roughly an hour a day, or significant interference with your life.',
      items: [
        'Intrusive thoughts, images or urges that repeat and are distressing to have',
        'Washing, cleaning or purity rituals that have grown longer over time',
        'Checking locks, taps, gas or documents repeatedly, with the doubt returning immediately',
        'Counting, repeating actions, or needing things arranged in an exact way',
        'Repeating prayers or religious acts because of doubt that they were performed correctly',
        'Asking family for reassurance about the same fear, repeatedly',
        'Avoiding people, places or objects that trigger the thoughts',
        'Knowing the fear is out of proportion and being unable to act on that knowledge',
      ],
    },

    whenToSeek: [
      'The rituals take an hour or more of your day',
      'They are interfering with work, study, prayer or family life',
      'Your family has begun taking part in the rituals or providing constant reassurance',
      'You are avoiding ordinary situations to keep the thoughts away',
      'The distress is significant, however irrational you know the fear to be',
    ],

    treatment: [
      {
        title: 'Recognising it as OCD',
        body: 'OCD is regularly misidentified: as anxiety, as psychosis because of the intrusive content, or as a religious problem. The assessment establishes the obsession–compulsion cycle and separates it from the conditions it resembles, which matters because the treatments are not interchangeable.',
      },
      {
        title: 'Exposure and response prevention',
        body: 'ERP is the psychological treatment with the strongest evidence in OCD: graded, planned contact with what triggers the anxiety, without performing the compulsion, until the anxiety falls on its own. It is demanding and it is effective, and it is done at a pace agreed with you rather than imposed.',
      },
      {
        title: 'Medication, at the doses OCD actually needs',
        body: 'SSRIs are effective in OCD, but typically at higher doses and over a longer period than in depression, often eight to twelve weeks before the benefit is clear. Under-dosing and stopping early are the two most common reasons medication is thought to have failed, and both are avoidable.',
      },
    ],

    urgent: null,

    faqs: [
      {
        q: 'Does having violent or blasphemous thoughts mean I am dangerous?',
        a: 'No. Intrusive thoughts in OCD are ego-dystonic. They are distressing precisely because they run against everything the person values, and that distress is itself a diagnostic feature. People with OCD are not more likely to act on these thoughts. Naming them in the consulting room is the step that ends years of carrying them alone.',
      },
      {
        q: 'Is OCD the same as liking things clean and organised?',
        a: 'No, and the everyday use of the word does real harm to people who have the condition. A preference for order is a preference. OCD is distressing, time-consuming, and unwanted by the person experiencing it.',
      },
      {
        q: 'Can OCD be cured?',
        a: 'Most people achieve a substantial and lasting reduction in symptoms with ERP, medication, or both: enough that OCD no longer organises their day. Symptoms can return under stress, which is why relapse prevention is part of the treatment rather than an afterthought.',
      },
    ],

    related: ['anxiety-and-panic', 'depression', 'adolescent-mental-health'],
    schema: {
      name: 'Obsessive–compulsive disorder',
      alternateName: ['OCD', 'Obsessive compulsive disorder', 'Intrusive thoughts'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'psychosis',
    label: 'Psychosis',
    icon: 'capsule',
    image: 'psychosis',
    featured: false,
    card: {
      title: 'Psychotic',
      titleEm: 'disorders',
      body: 'Diagnosis, medication and long-term follow-up, with family kept in the picture.',
    },

    seoTitle: 'Psychosis & Schizophrenia Care, Peshawar | Dr. S. Qazi',
    seoDescription:
      `Assessment, medication and follow-up for psychosis and schizophrenia in Peshawar. Dr. Shandana Qazi at ${VENUE_NAME}.`,

    h1: { text: 'Psychosis and schizophrenia', em: 'care' },
    lede:
      'Psychosis is treatable, and it is treated best early. The single biggest factor in long-term outcome is how long someone waits before being seen.',

    intro: [
      'Psychosis describes a period in which a person loses contact with shared reality: hearing or seeing things others do not, or holding beliefs with total conviction that those around them can see are not true. It occurs in schizophrenia, in bipolar disorder and in severe depression, and it can also be caused by substances, by prescribed medication, or by physical illness.',
      'That range of causes is why assessment matters so much. A first episode of psychosis needs a proper medical and psychiatric workup, not an assumption, because the treatment for a drug-induced psychosis, an organic cause and a primary psychotic illness are very different.',
      'Families usually notice first, and families usually bring the person in. That is welcome. Relatives are part of the treatment here: monitoring, medication and early warning signs are all easier to manage when the people at home understand what they are looking at.',
    ],

    signs: {
      intro:
        'Early signs are typically a change in the person rather than any single dramatic event.',
      items: [
        'Hearing voices, or seeing things others do not',
        'Fixed beliefs held with certainty that others can see are not accurate',
        'Believing one is being watched, followed, poisoned, or plotted against',
        'Speech that becomes difficult to follow, or thinking that jumps between unconnected ideas',
        'Marked withdrawal from family, friends, work or study',
        'Neglect of self-care, sleep reversal, or a sharp drop in functioning',
        'Emotional flatness, or reactions that do not fit the situation',
        'Suspicion of family members, or of the food and medicine at home',
      ],
    },

    whenToSeek: [
      'Any first episode of these symptoms: early treatment materially changes the outcome',
      'A known psychotic illness where symptoms are returning',
      'Medication has been stopped and the person is becoming unwell again',
      'Side effects are making current medication intolerable',
      'The person is at risk of harming themselves or someone else: this is an emergency',
    ],

    treatment: [
      {
        title: 'Establishing the cause',
        body: 'A first episode is assessed thoroughly: the history, the timeline, substance use, prescribed medication, and physical investigation where an organic cause is possible. Substance-induced and organic psychoses are common and are managed differently from a primary psychotic illness.',
      },
      {
        title: 'Antipsychotic medication, monitored properly',
        body: 'Antipsychotics are the core treatment and they work, but only if they are tolerable. Side effects (weight, metabolic changes, movement effects, sedation) are asked about at every review and treated as reasons to adjust rather than as the price of treatment. Long-acting injections are an option where daily tablets are difficult.',
      },
      {
        title: 'Family, relapse prevention and follow-up',
        body: 'Long-term outcome depends heavily on staying well between episodes. That means regular follow-up, a shared plan for the early warning signs specific to this person, and a family who understand what to do and when to call, not simply a prescription renewed every few months.',
      },
    ],

    urgent:
      'If someone is at immediate risk of harming themselves or another person, or is too unwell to stay safe, go to the emergency department at Rehman Medical Institute, or call the hospital UAN. Do not wait for a scheduled appointment.',

    faqs: [
      {
        q: 'Can psychosis be treated?',
        a: 'Yes. Most first episodes respond substantially to treatment, and many people recover fully and return to work or study. Outcomes are consistently better the earlier treatment begins, which is the main argument against waiting to see whether it passes.',
      },
      {
        q: 'Does medication have to be taken for life?',
        a: 'Not always. After a single episode with full recovery, medication is often continued for one to two years and then reduced under close supervision. Recurrent episodes usually mean longer treatment. Stopping suddenly and without supervision is the most common cause of relapse.',
      },
      {
        q: 'Can the family be involved in treatment?',
        a: 'Yes, and it is encouraged. With the patient\'s agreement, relatives are included in understanding the illness, the medication and the early warning signs. Families that know what to watch for catch relapses considerably sooner.',
      },
    ],

    related: ['depression', 'adolescent-mental-health', 'trauma-and-ptsd'],
    schema: {
      name: 'Psychotic disorder',
      alternateName: ['Psychosis', 'Schizophrenia', 'First-episode psychosis'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'adolescent-mental-health',
    label: 'Adolescent mental health',
    icon: 'people',
    image: 'adolescent',
    featured: false,
    card: {
      title: 'Adolescent mental',
      titleEm: 'health',
      body: 'Teenagers and young adults, seen properly, not as small adults or as a phase.',
    },

    seoTitle: 'Teenage & Adolescent Psychiatrist in Peshawar | Dr. Qazi',
    seoDescription:
      `Adolescent psychiatry in Peshawar for teenagers and young adults: depression, anxiety, exam stress and self-harm. Dr. Shandana Qazi, ${VENUE_NAME}.`,

    h1: { text: 'Adolescent mental health', em: 'care' },
    lede:
      'Most lifelong mental illness begins before the age of twenty-five. Adolescence is the point at which treatment changes the most, and it is also the point at which it is most often postponed.',

    intro: [
      'Adolescent psychiatry is one of Dr. Qazi’s areas of practice. Teenagers are not small adults: the same diagnosis presents differently, the assessment has to include school and family, and the treatment thresholds, particularly for medication, are not the same.',
      'The hardest part is usually the first judgement, made at home, about whether something is a phase. Irritability, withdrawal and a drop in grades can all be ordinary adolescence. They can also be the first clear sign of depression, an anxiety disorder, OCD, an eating disorder, or the early stages of a psychotic illness. The distinguishing factor is not intensity but duration and cost: how long it has continued, and what it is taking from the young person\'s life.',
      'Self-harm in particular is often read as attention-seeking. Clinically, it is a marker of genuine distress and it is one of the strongest predictors of later harm. It is always worth an assessment.',
    ],

    signs: {
      intro:
        'What is worth attention is a sustained change from how this young person usually is.',
      items: [
        'A clear drop in school or college performance over months rather than weeks',
        'Withdrawal from friends, family and activities they used to seek out',
        'Irritability, anger or tearfulness that is out of character and persistent',
        'Refusing school, or increasing absence with physical complaints',
        'Sleep reversal, or being awake most of the night',
        'Marked change in appetite, weight, or eating behaviour',
        'Cuts, burns or other signs of self-harm',
        'Talking about being a burden, or about not wanting to be here',
        'New secrecy, changed friendship groups, or suspected substance use',
      ],
    },

    whenToSeek: [
      'The change has lasted more than a few weeks and is not lifting',
      'School attendance or performance has clearly deteriorated',
      'There are signs of self-harm, or talk of not wanting to be alive',
      'Eating, weight or body image have become a preoccupation',
      'You are unsure whether it is ordinary adolescence: an assessment answers that',
    ],

    treatment: [
      {
        title: 'An assessment that includes the whole picture',
        body: 'The history covers home, school, friendships, sleep, social media use and substances, and takes account of what the family has observed. Where it is appropriate, part of the appointment is with the young person alone. That is standard practice, and it is usually where the most useful information comes from.',
      },
      {
        title: 'Psychotherapy first, in most cases',
        body: 'For mild and moderate depression and anxiety in young people, structured psychological treatment is first-line and often sufficient. Medication is considered where symptoms are severe, where there is significant risk, or where therapy alone has not been enough, and the threshold is deliberately higher than it is in adults.',
      },
      {
        title: 'Working with the family and the school',
        body: 'Treatment that ignores the environment a teenager returns to each day does not hold. Parents are given a clear explanation of the diagnosis and of what helps, and adjustments around exams or attendance are supported where they are clinically warranted.',
      },
    ],

    urgent:
      'If a young person has seriously harmed themselves, or has said they intend to end their life, treat it as an emergency. Go to the emergency department at Rehman Medical Institute, or call the hospital UAN, rather than waiting for an appointment.',

    faqs: [
      {
        q: 'At what age can a teenager be seen?',
        a: 'Adolescent psychiatry covers the teenage years and young adulthood. If you are unsure whether the age or the presentation is appropriate, ask when you call. Being directed to the right clinician is part of what the call is for.',
      },
      {
        q: 'Does a parent stay in the room?',
        a: 'Usually the appointment includes both time together and time with the young person alone. Both matter: parents hold the history, and adolescents often disclose the things that determine the diagnosis only when seen on their own.',
      },
      {
        q: 'Is my teenager’s information confidential from me?',
        a: 'Adolescents are given a clear explanation of confidentiality and of its limits, which centre on safety. Where there is a risk of serious harm, parents are involved. Outside of that, the trust of the young person is what makes treatment work, and it is protected.',
      },
      {
        q: 'Is self-harm just attention-seeking?',
        a: 'No. Self-harm is a sign of distress that has exceeded a young person\'s capacity to manage it, and it is one of the strongest known predictors of later serious harm. It always warrants assessment rather than dismissal.',
      },
    ],

    related: ['depression', 'anxiety-and-panic', 'ocd'],
    schema: {
      name: 'Adolescent mental health',
      alternateName: ['Adolescent psychiatry', 'Teenage depression', 'Child and adolescent mental health'],
    },
  },
];

/** Lookup by slug — used by the related-condition links and the page generator. */
export const SERVICES_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((c) => [c.slug, c])
);

/** The six carried by the homepage photo grid. */
export const FEATURED_SERVICES = SERVICES.filter((c) => c.featured);

/** Flattened for `knowsAbout` in the Physician schema. */
export const SERVICE_KEYWORDS = SERVICES.flatMap((c) => [
  c.schema.name,
  ...c.schema.alternateName,
]);
