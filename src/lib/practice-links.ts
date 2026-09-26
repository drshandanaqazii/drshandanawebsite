/**
 * The links derived from the practice, built once.
 *
 * The map link and the map embed are resolved from the same address string, so
 * the pin in the iframe and the pin behind "Directions" can never drift apart.
 * The embed is keyless — no API key and no billing account.
 *
 * TEL_HREF and the two map links come off BOOKING_VENUE, not off PRACTICE: they
 * have to follow whichever clinic is currently the bookable one. UAN_HREF and
 * MAIL_HREF stay on PRACTICE because they are the hospital's switchboard and
 * her hospital address, and both remain true of RMI whichever venue is booking.
 */

import { PRACTICE, BOOKING_VENUE, SALMA } from '../consts';

export const TEL_HREF = `tel:${BOOKING_VENUE.phone.replace(/\s/g, '')}`;
export const UAN_HREF = `tel:${PRACTICE.hospitalPhone.replace(/\s/g, '')}`;
export const MAIL_HREF = `mailto:${PRACTICE.email}`;

/**
 * The message already typed into the box when WhatsApp opens.
 *
 * Booking by WhatsApp is the practice's own choice, so the friction worth
 * removing is not the tap — it is the blank compose field. A first message that
 * says nothing useful costs the desk a round trip to ask who is writing and what
 * they want, and costs the patient a reply they have to wait for.
 *
 * So the draft names the doctor and asks the one question that produces a slot.
 * It stops there deliberately: it asks for no symptoms, no history and no reason
 * for the appointment. WhatsApp is not a confidential channel, this text is
 * visible in a link preview and in the URL bar, and a prefilled message that
 * puts a person's mental health complaint into their own outbox before they have
 * decided to share it is a privacy failure dressed up as convenience. The
 * clinical conversation happens in the room.
 *
 * `encodeURIComponent`, not a hand-escaped string — the copy contains spaces, a
 * comma and a full stop, and any of them typed raw into a query string is a
 * broken link on some clients and a truncated message on others.
 */
export const WHATSAPP_TEXT =
  `Assalam-o-Alaikum. I would like to ask about an appointment with Dr. Shandana Qazi.`;

export const WHATSAPP_HREF =
  `https://wa.me/${SALMA.whatsapp}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

/* The clinic's own name leads the query once it has an address of its own. A
   street line alone is what Google geocodes from, but a named business in front
   of it is what makes the result land on the business rather than on the
   building — and for a clinic inside a larger block that is the difference
   between a pin on the door and a pin on the street.

   Skipped when the street line already opens with the name, which RMI's does.
   Repeating it produces "Rehman Medical Institute, Rehman Medical Institute,
   5-B/2…", and a doubled token measurably degrades the geocode rather than
   being ignored. */
const { name, address } = BOOKING_VENUE;
const namePrefix = address.street.toLowerCase().includes(name.toLowerCase()) ? '' : name;

const MAPS_QUERY = encodeURIComponent(
  [namePrefix, address.street, address.locality, address.region].filter(Boolean).join(', ')
);

export const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`;
