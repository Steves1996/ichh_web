import type { Session } from '../../types';
import type * as fr from '../programme';

// Version anglaise du programme (../programme.ts). Les horaires, salles de référence,
// types et intervenants viennent de la version française ; seuls les textes sont traduits.

export const days: typeof fr.days = [
{ day: 1 as const, date: '12 November 2026', label: 'Day 1', theme: 'Opening & first panels' },
{ day: 2 as const, date: '13 November 2026', label: 'Day 2', theme: 'Panels, medical mission & closing' }];


type SessionText = Pick<Session, 'title' | 'description' | 'room' | 'track'>;

export const sessionTexts: Record<string, SessionText> = {
  s101: {
    title: 'Delegation welcome and kit collection',
    description:
    'Participant registration, conference kit collection and orientation at the Hilton Yaoundé. A coffee area is open in the main lobby.',
    room: 'Hilton lobby',
    track: 'Logistics'
  },
  s102: {
    title: 'Official opening ceremony',
    description:
    'Cameroon national anthem, welcome address by the organising committee, inaugural lecture by the chair of the scientific committee, speech by the Minister of Public Health and opening address by the government representative.',
    room: 'Plenary hall',
    track: 'Plenary'
  },
  s103: {
    title: 'Opening of the Digital Health Expo',
    description:
    'Ribbon-cutting at the Expo: NGOs, pharmacies, health start-ups, laboratories, banks and insurers present their solutions. Cocktail by invitation.',
    room: 'Health Expo',
    track: 'Innovation'
  },
  s104: {
    title: 'Panel 1 — Health infrastructure and equipment in Africa',
    description:
    'Assessing African medical facilities against international standards and exploring solutions. With MINSANTE, MINEPAT, builders, equipment suppliers, WHO, UNICEF, GIZ, AfDB, BDEAC and CEMAC.',
    room: 'Plenary hall',
    track: 'Infrastructure & equipment'
  },
  s105: {
    title: 'Panel 2 — Volunteer medicine in towns and villages',
    description:
    'How volunteering and CSR contribute to care for vulnerable populations: lasting or temporary action? An alternative or a complement to Universal Health Coverage?',
    room: 'Plenary hall',
    track: 'Volunteer medicine'
  },
  s106: {
    title: 'Panel 3 — Universal Health Coverage in the development of African countries',
    description:
    'The case of Cameroon, the example of CNAMGS in Gabon, the role of banks and insurers, funding the health voucher and international benchmarks.',
    room: 'Panel room',
    track: 'Universal Health Coverage'
  },
  s107: {
    title: 'First B2B evening — networking and business showcase',
    description:
    'Business and partnership meetings between companies, institutions, funders and health project leaders, around the Health Expo.',
    room: 'Hilton garden',
    track: 'Networking'
  },
  s201: {
    title: 'Panel 4 — Community medicine in rural areas and medical deserts',
    description:
    'The role of medical missions in rural areas, promoting local medicine and mobile hospitals, free care campaigns, accelerating telemedicine and digitising primary care.',
    room: 'Plenary hall',
    track: 'Community health'
  },
  s202: {
    title: 'Panel 5 — Global responses to health crises: COVID, Ebola, HIV/AIDS',
    description:
    'Global health surveillance, pooling efforts against global threats, developing new research technologies and taking African solutions into account.',
    room: 'Plenary hall',
    track: 'Global health security'
  },
  s203: {
    title: 'Medical mission — Yaoundé General Hospital',
    description:
    'A free medical assistance mission held during the conference, continuing the Mahola Health Foundation’s work on the ground. Consultations, surgery and mother-and-child care.',
    room: 'Yaoundé General Hospital',
    track: 'Community health'
  },
  s204: {
    title: 'Panel 6 — Access to medicines and essential products',
    description:
    'The need for local pharmaceutical production, the role of industrial pharmacy, promoting entrepreneurship, subsidies and access to medicines for all.',
    room: 'Panel room',
    track: 'Access to medicines'
  },
  s205: {
    title: 'Panel 7 — Artificial intelligence and smart diagnostics',
    description:
    'Developing telemedicine and smart diagnostic tools, distance learning, networking medical expertise, managing digital data and the state’s health sovereignty.',
    room: 'Plenary hall',
    track: 'Digital health & AI'
  },
  s206: {
    title: 'Panel 8 — Women’s leadership in the health sector',
    description:
    'Promoting gender and youth in the health sector, and taking gender and youth into account in public health system policy.',
    room: 'Plenary hall',
    track: 'Gender & youth'
  },
  s207: {
    title: 'Official closing ceremony — Yaoundé Declaration',
    description:
    'Reading of the conference’s final report, words of thanks to the Cameroonian authorities, presentation of participation certificates and adoption of the Yaoundé Declaration.',
    room: 'Plenary hall',
    track: 'Plenary'
  },
  s208: {
    title: 'Mahola Health Foundation 10th-anniversary gala',
    description:
    'Speeches, artistic performances, presentation of the ICHH 2026 Awards and special jury prizes, and recognition of the 2026 Mahola Health Foundation Ambassadors.',
    room: 'Hilton garden',
    track: 'Networking'
  }
};
