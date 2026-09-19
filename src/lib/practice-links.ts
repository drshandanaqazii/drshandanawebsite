/**
 * The four links derived from PRACTICE, built once.
 *
 * The map link and the map embed are resolved from the same address string, so
 * the pin in the iframe and the pin behind "Directions" can never drift apart.
 * The embed is keyless — no API key and no billing account.
 */

import { PRACTICE } from '../consts';

export const TEL_HREF = `tel:${PRACTICE.bookingPhone.replace(/\s/g, '')}`;
export const UAN_HREF = `tel:${PRACTICE.hospitalPhone.replace(/\s/g, '')}`;
export const WHATSAPP_HREF = `https://wa.me/${PRACTICE.whatsapp}`;
export const MAIL_HREF = `mailto:${PRACTICE.email}`;

const MAPS_QUERY = encodeURIComponent(
  `${PRACTICE.address.street}, ${PRACTICE.address.locality}, ${PRACTICE.address.region}`
);

export const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`;
