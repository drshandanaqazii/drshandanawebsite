/* ==========================================================================
   BOOKING — when Dr. Qazi can be booked, and how a request is worded
   --------------------------------------------------------------------------
   The one place the booking dialog reads its hours from. Change a day or a
   time here and the dialog, the chips on /appointments and the day it offers
   all move together.

   There is no server behind the dialog. A request is composed into a WhatsApp
   message to the clinic and the desk confirms it, which is how the practice
   already takes bookings. So these are *requested* slots: nothing here can know
   whether one is taken, and the dialog says as much instead of pretending.
   ========================================================================== */

export type BookingModeId = 'in-person' | 'online';

export interface BookingMode {
  id: BookingModeId;
  /** Heading on the choice card. */
  label: string;
  /** Short form, for the summary line and the WhatsApp message. */
  short: string;
  /** Where it happens, in a few words. */
  where: string;
  /** 0 = Sunday … 6 = Saturday, matching Date#getUTCDay. */
  days: readonly number[];
  /** Printed form of `days`. */
  daysDisplay: string;
  /** 24h "HH:MM". Last slot starts SLOT_MINUTES before `closes`. */
  opens: string;
  closes: string;
  /** Printed form of the hours. */
  hoursDisplay: string;
}

/* Two options: in person at RMI on weekdays, or Salma Clinic (Online) by
   video at weekends. Salma is the online clinic; it has no building of its own. */
export const BOOKING_MODES: readonly BookingMode[] = [
  {
    id: 'in-person',
    label: 'In person at RMI',
    short: 'In person (RMI)',
    where: 'Rehman Medical Institute, Hayatabad',
    days: [1, 2, 3, 4, 5],
    daysDisplay: 'Mon–Fri',
    opens: '10:00',
    closes: '15:00',
    hoursDisplay: '10:00 am – 3:00 pm',
  },
  {
    id: 'online',
    label: 'Salma Clinic (Online)',
    short: 'Salma Clinic (Online)',
    where: 'By video call, from anywhere',
    days: [6, 0],
    daysDisplay: 'Sat–Sun',
    opens: '12:00',
    closes: '17:00',
    hoursDisplay: '12:00 pm – 5:00 pm',
  },
];

/** Length of one bookable slot, in minutes. */
export const SLOT_MINUTES = 30;

/** How many calendar days ahead the dialog looks for open days. */
export const BOOKING_WINDOW_DAYS = 21;

/** Same-day requests need at least this much notice, in minutes. */
export const BOOKING_LEAD_MINUTES = 60;

/** The clinic's clock. Slots are wall-clock times in Pakistan (PKT), whatever the visitor's device says, which matters to patients abroad. */
export const BOOKING_TIMEZONE = 'Asia/Karachi';
