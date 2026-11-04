import type { Session } from '../../types';
import type * as fr from '../programme';

// English copy for the one-day French programme.
export const days: typeof fr.days = [
  { day: 1 as const, date: '13 November 2026', label: 'Friday, 13 November', theme: 'Conference, panels and gala' },
];

type SessionText = Pick<Session, 'title' | 'description' | 'room' | 'track'>;

export const sessionTexts: Record<string, SessionText> = {
  s101: {
    title: 'Delegation welcome, registration and conference kits',
    description: 'Participant and exhibitor arrival at the Digital Health Expo.',
    room: 'Hilton Yaoundé',
    track: 'Welcome',
  },
  s102: {
    title: 'Arrival of officials',
    description: 'Welcome for the government representative and delegations.',
    room: 'Hilton Yaoundé',
    track: 'Ceremony',
  },
  s103: {
    title: 'Official opening ceremony',
    description: 'National anthem, welcome from the organising committee, inaugural address by the chair of the scientific committee, speeches by the Minister of Public Health and the government representative, and group photo.',
    room: 'Plenary hall',
    track: 'Ceremony',
  },
  s104: {
    title: 'Opening of the Digital Health Expo',
    description: 'Ribbon-cutting and official tour of the stands.',
    room: 'Health Expo',
    track: 'Exhibition',
  },
  s115: {
    title: 'Digital Health Expo — open all day',
    description: 'NGOs, associations, pharmacies, national programmes, health start-ups, service providers, banks, insurers and health facilities showcase their work.',
    room: 'Health Expo',
    track: 'Exhibition',
  },
  s105: {
    title: 'Medical mission — Yaoundé General Hospital',
    description: 'A day-long free-care operation led by the Mahola Health Foundation teams.',
    room: 'Yaoundé General Hospital',
    track: 'Medical mission',
  },
  s106: {
    title: 'Cocktail and lunch break',
    description: 'Invitation-only cocktail at the Health Expo and first B2B meetings.',
    room: 'Health Expo',
    track: 'Networking',
  },
  s107: {
    title: 'Panels 1 and 2 — parallel sessions',
    description: 'Panel 1: health infrastructure and equipment in Africa. Panel 2: volunteer medicine in towns and villages.',
    room: 'Panel rooms',
    track: 'Panels 1 and 2',
  },
  s108: {
    title: 'Workshops and educational talks for young people',
    description: 'Mobile health caravan, volunteer training, taxation, preventive health and health diplomacy.',
    room: 'Hilton Yaoundé',
    track: 'Workshops and talks',
  },
  s109: {
    title: 'Panels 3 and 4 — parallel sessions',
    description: 'Panel 3: Universal Health Coverage in African countries. Panel 4: community medicine and tackling medical deserts.',
    room: 'Panel rooms',
    track: 'Panels 3 and 4',
  },
  s110: {
    title: 'Panels 5 and 6 — parallel sessions',
    description: 'Panel 5: global responses to health crises. Panel 6: access to medicines and essential products.',
    room: 'Panel rooms',
    track: 'Panels 5 and 6',
  },
  s111: {
    title: 'Panels 7 and 8 — parallel sessions',
    description: 'Panel 7: artificial intelligence and smart diagnostics. Panel 8: women’s leadership in the health sector.',
    room: 'Panel rooms',
    track: 'Panels 7 and 8',
  },
  s112: {
    title: 'Official closing ceremony',
    description: 'Reading of the final report, presentation of participation certificates, remarks from the organising committee and Minister of Public Health, closing address and group photo.',
    room: 'Plenary hall',
    track: 'Ceremony',
  },
  s113: {
    title: 'Closing press conference',
    description: 'Updates for national and international media.',
    room: 'Hilton Yaoundé',
    track: 'Press',
  },
  s114: {
    title: 'Mahola Health Foundation 10th-anniversary gala',
    description: 'Invitation-only: speeches, artistic performances, ICHH 2026 Awards, special jury prizes and recognition of the Foundation’s ambassadors.',
    room: 'Hilton Yaoundé',
    track: 'Gala',
  },
};
