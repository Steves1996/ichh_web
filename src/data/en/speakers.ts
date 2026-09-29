import type { Speaker } from '../../types';

// Version anglaise des fiches intervenants (../speakers.ts), indexée par identifiant.
// Photo, e-mail et réseaux viennent de la version française ou du CMS.

type SpeakerText = Pick<Speaker, 'name' | 'role' | 'organization' | 'country' | 'domain' | 'bio' | 'publications'>;

export const speakerTexts: Record<string, SpeakerText> = {
  'sp-mbouck': {
    name: 'Dr Mathilde Mbouck',
    role: 'President',
    organization: 'Mahola Health Foundation',
    country: 'Cameroon',
    domain: 'Community health',
    bio: 'A physician who founded the Mahola Health Foundation in 2016, Dr Mathilde Mbouck is coordinating ICHH Yaoundé 2026. Over ten years she has led twelve medical missions in Cameroon and Central Africa — more than 8,700 consultations, 200 surgical procedures and 25 assisted births — relying on multidisciplinary volunteer teams and a pop-up clinic model.',
    publications: [
    'Ten years of medical missions in Cameroon: results and method (2026)',
    'The pop-up clinic as a response to medical deserts (2024)']

  },
  'sp-etoa': {
    name: 'Speaker — MINSANTE',
    role: 'Department of Health Infrastructure and Equipment',
    organization: 'Ministry of Public Health (Cameroon)',
    country: 'Cameroon',
    domain: 'Infrastructure & equipment',
    bio: 'Representative of the Ministry of Public Health on Panel 1, which assesses African medical facilities against international standards and solutions for modernising infrastructure, as part of the 2020-2030 Health Sector Strategy.',
    publications: []
  },
  'sp-nkolo': {
    name: 'Speaker — Community medicine',
    role: 'Coordination of rural medical missions',
    organization: 'Network of community health actors',
    country: 'Cameroon',
    domain: 'Community health',
    bio: 'A local-medicine practitioner, this speaker will share field experience of mobile hospitals, free care campaigns and the digitisation of primary health care in rural areas (Panels 2 and 4).',
    publications: []
  },
  'sp-abena': {
    name: 'Speaker — Universal Health Coverage',
    role: 'Health financing and health insurance',
    organization: 'Financial institutions and insurers (CEMAC region)',
    country: 'Central Africa',
    domain: 'Universal Health Coverage',
    bio: 'A health financing specialist, this speaker will address the roll-out of UHC in African countries: the case of Cameroon, the example of CNAMGS in Gabon, the role of banks and insurers, and funding the health voucher (Panels 3 and 5).',
    publications: []
  },
  'sp-fotso': {
    name: 'Speaker — Digital health',
    role: 'Artificial intelligence and smart diagnostics',
    organization: 'Digital health ecosystem (ANTIC, universities, start-ups)',
    country: 'Cameroon',
    domain: 'Digital health & AI',
    bio: 'This speaker will discuss the role of artificial intelligence and smart diagnostic tools in developing priority health services: telemedicine, distance learning, networking expertise and health data sovereignty (Panel 7).',
    publications: []
  },
  'sp-atangana': {
    name: 'Speaker — Leadership and gender',
    role: 'Promoting women’s leadership in health',
    organization: 'MINPROFF · UN Women · women’s associations',
    country: 'Cameroon',
    domain: 'Gender & youth',
    bio: 'This speaker will lead Panel 8 on promoting and developing women’s leadership in the health sector, and on taking gender and youth into account in public health policy.',
    publications: []
  }
};
