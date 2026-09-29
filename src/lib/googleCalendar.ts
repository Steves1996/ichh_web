import type { Session } from '../types';

const MONTHS: Record<string, number> = {
  janvier: 0,
  février: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  décembre: 11,
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Parse une date au format « 12 novembre 2026 » ou « 12 November 2026 ». */
function parseDayDate(date: string): { year: number; month: number; day: number } | null {
  const match = date.match(/(\d{1,2})\s+([a-zàâäéèêëïîôöùûüç]+)\s+(\d{4})/i);
  if (!match) return null;
  const month = MONTHS[match[2].toLowerCase()];
  if (month === undefined) return null;
  return { day: Number(match[1]), month, year: Number(match[3]) };
}

function toGoogleDateTime(year: number, month: number, day: number, time: string): string | null {
  const [h, m] = time.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return `${year}${pad(month + 1)}${pad(day)}T${pad(h)}${pad(m)}00`;
}

/**
 * Construit l'URL « Ajouter à Google Agenda » pour une session du programme.
 * Retourne `null` si la date du jour ne peut pas être interprétée.
 */
export function buildGoogleCalendarUrl(
  session: Session,
  dayInfo: { date: string },
  location?: string
): string | null {
  const parsed = parseDayDate(dayInfo.date);
  if (!parsed) return null;

  const start = toGoogleDateTime(parsed.year, parsed.month, parsed.day, session.start);
  const end = toGoogleDateTime(parsed.year, parsed.month, parsed.day, session.end);
  if (!start || !end) return null;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: session.title,
    dates: `${start}/${end}`,
    details: session.description,
    location: location ?? session.room,
    ctz: 'Africa/Douala',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
