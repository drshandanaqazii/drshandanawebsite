/**
 * One photograph per service, with its alt text and its framing, in one
 * place — the homepage grid and the nine service pages all read from here, so
 * a picture can never be described one way on one page and another way on the
 * next.
 *
 * No stock portrait anywhere near her name, and the alt text says what is in
 * the frame and stops — it does not narrate what the person is feeling, which
 * is not something a photograph can tell a reader.
 *
 * All nine services now carry a client-chosen photograph with a person in it.
 * The three that used to run an atmospheric still — OCD, psychosis and
 * adolescent mental health — were the ones where that mattered most, and the
 * note that used to sit here said so: an empty room is better than implying a
 * stranger has psychosis. That is now a decision the practice has taken the
 * other way, deliberately. The psychosis frame in particular is a staged image
 * of a person being reached at by disembodied hands, which is a depiction of
 * persecution rather than of the illness, so it is the one to revisit first if
 * the set is ever reviewed.
 */

import depression from '../assets/service-depression.jpg';
import anxiety from '../assets/service-anxiety.jpg';
import stress from '../assets/service-stress.jpg';
import sleep from '../assets/service-sleep.jpg';
import trauma from '../assets/service-trauma.jpg';
import femaleMental from '../assets/service-female-mental.jpg';
import ocd from '../assets/service-ocd.jpg';
import psychosis from '../assets/service-psychosis.jpg';
import adolescent from '../assets/service-adolescent.jpg';

export interface ServiceImage {
  src: ImageMetadata;
  alt: string;
  /**
   * Framing overrides, for photographs whose subject sits against an edge of
   * the source frame.
   *
   * The default treatment centres a 4:3 crop and over-scales it 1.22× so the
   * pan has somewhere to travel — which spends about 11% of the picture on
   * every edge, plus another 8% on whichever edge the pan is heading for. That
   * is fine for a subject with air around it and wrong for one already touching
   * the edge, so those anchor the over-scale to the edge they cannot lose and
   * give up the pan on that axis. An anchored edge has no slack behind it;
   * travel is made of slack.
   */
  position?: string;
  origin?: string;
  pan?: number;
}

export const DEFAULT_PAN = 44;

export const SERVICE_IMAGES: Record<string, ServiceImage> = {
  depression: {
    src: depression,
    alt: 'A man sitting on the floor beside a window, head resting on his knees',
    // He is hard against the right edge of the source and the blinds fill the
    // rest. A centred crop cut his back off and handed most of the card to the
    // blinds; anchoring right takes the whole crop out of the empty side.
    position: '100% 50%',
    origin: '100% 0%',
    pan: 0,
  },
  anxiety: {
    src: anxiety,
    alt: 'A woman in a knitted sweater sitting with both hands covering her face',
  },
  stress: {
    src: stress,
    alt: 'A woman lying on the floor beside an open laptop, a hand at her forehead',
  },
  sleep: {
    src: sleep,
    alt: 'A woman awake on a bed at night, resting her face in her hands',
    // The crown of her head runs off the top of the source photograph itself,
    // so there is no margin here to spend: anchored to the top, and held still.
    origin: '50% 0%',
    pan: 0,
  },
  trauma: {
    src: trauma,
    alt: 'Someone resting a hand on the arm of a man sitting with his head in his hands',
  },
  'female-mental': {
    src: femaleMental,
    alt: 'A young woman sitting against a white wall, head lowered, hands at her temples',
  },

  /* The three added last. All portrait sources, and the page header crops them
     to a wide band — so each one anchors above centre to keep the subject in
     the strip that survives, rather than a chest and a table edge. */
  ocd: {
    src: ocd,
    alt: 'A person at a white desk crumpling a sheet of paper in both hands, a closed notebook below',
    position: '50% 38%',
  },
  psychosis: {
    src: psychosis,
    alt: 'A woman sitting on a pink floor with her hands at her face, black gloved hands reaching towards her from every side',
    position: '50% 32%',
  },
  adolescent: {
    src: adolescent,
    alt: 'A teenage boy in a black hooded top sitting on a sofa, looking down',
    position: '50% 30%',
  },
};
