import type { Member, NewsItem, Sponsor, TimelineEntry } from '../../types';
import type * as fr from '../site';

// Version anglaise des contenus de ../site.ts. Seuls les champs textuels sont
// traduits : les identifiants, dates techniques, images et coordonnées viennent
// toujours de la version française (ou du CMS).

export const eventText: Partial<typeof fr.event> = {
  edition: '10 years of the Mahola Health Foundation',
  theme: 'Building Resilient Health for Vulnerable Populations in Africa',
  slogan: 'Two days to build resilient health for Africa’s vulnerable populations.',
  country: 'Cameroon',
  venue: 'Hilton Yaoundé',
  dates: '12 – 13 November 2026'
};

export const organizers: typeof fr.organizers = [
{ role: 'General supervision', name: 'Ministry of Public Health (MINSANTE)', detail: 'Republic of Cameroon' },
{ role: 'Coordination', name: 'Mahola Health Foundation', detail: 'Since 2016' },
{ role: 'General commissioner', name: 'All Access Agency', detail: 'Event engineering, Paris' }];


export const president: typeof fr.president = {
  name: 'Dr Mathilde Mbouck',
  role: 'President, Mahola Health Foundation'
};

export const keyFigures: typeof fr.keyFigures = [
{ value: '10', label: 'years of solidarity', detail: 'Mahola Health Foundation, since 2016' },
{ value: '500', label: 'expected participants', detail: 'Policymakers, experts, civil society' },
{ value: '8', label: 'high-level panels', detail: 'Over two days' },
{ value: '7', label: 'Central African countries', detail: 'CEMAC-ECCAS region' },
{ value: '12', label: 'Mahola medical missions', detail: '8,700 consultations' }];


export const reasons: typeof fr.reasons = [
{
  title: 'Decision-makers in one room',
  text: 'CEMAC-ECCAS governments, MINSANTE, international institutions (WHO, UNAIDS, AfDB, BDEAC), professional bodies and the diplomatic corps around the same table.'
},
{
  title: 'Health Expo',
  text: 'A digital health expo: NGOs, pharmacies, start-ups, laboratories, banks and insurers showcase their solutions and services.'
},
{
  title: 'Business opportunities',
  text: 'Dedicated B2B sessions to build partnerships between companies, funders, institutions and health project leaders.'
},
{
  title: 'Innovation awards',
  text: 'The ICHH 2026 Awards and the special health innovation prize reward solutions already deployed in the field.'
},
{
  title: 'Yaoundé Declaration',
  text: 'The work of the eight panels feeds into the final report and a declaration of commitments carried by the delegations.'
}];


export const objectives: string[] = [
'Take stock of medical missions and mobile health in rural areas, and of how they are regulated in Cameroon.',
'Propose solutions to the health sovereignty challenges of African states, particularly in the CEMAC-ECCAS region.',
'Make recommendations for building and developing mobile infrastructure for priority health services.',
'Contribute to the National Health Plan and the 2020-2030 Health Sector Strategy (SND30), as well as to a sub-regional strategy for rural health.',
'Promote preventive health education, particularly among young people, and women’s leadership in the sector.',
'Identify and mobilise funding strategies for community health and volunteering.'];


export const audiences: typeof fr.audiences = [
{ title: 'Governments and ministries', text: 'MINSANTE, MINFI and sector ministries of Cameroon and the CEMAC-ECCAS countries.' },
{ title: 'International institutions', text: 'WHO, UNAIDS, UN, African Union, ECA, AfDB, BDEAC, GIZ, USAID, Synergies Africaines.' },
{ title: 'Health facilities', text: 'Referral and regional hospitals, laboratories, pharmacies, CENAME, national professional bodies and clinics.' },
{ title: 'Civil society', text: 'NGOs, associations, consumer groups, trade unions and community actors.' },
{ title: 'Private sector and funders', text: 'Companies, banks, insurers, pharmaceutical industry, health start-ups and development partners.' }];


export const outcomes: typeof fr.outcomes = [
{ label: 'Regulatory mapping', text: 'A review of regulatory tools for rural health and of the impact of bringing stakeholders together.' },
{ label: 'Medical missions framework', text: 'The conditions for deploying medical missions: technology, oversight, mobile data centres, alternative energy.' },
{ label: 'Consultation framework', text: 'A national and multinational mechanism for coordinating medical missions and collective action.' },
{ label: 'Yaoundé Declaration', text: 'Recommendations on health sovereignty, digital health, youth health and women’s leadership, backed by the conference’s final report.' }];


export const panels: typeof fr.panels = [
{ n: 1, title: 'Health infrastructure and equipment in Africa', summary: 'Assessing African medical facilities against international standards and identifying solutions.' },
{ n: 2, title: 'Volunteer medicine in towns and villages', summary: 'How volunteering and CSR contribute to care for vulnerable populations — an alternative or a complement to UHC?' },
{ n: 3, title: 'Universal Health Coverage in the development of African countries', summary: 'The case of Cameroon, the example of CNAMGS in Gabon, the role of banks and insurers, funding the health voucher.' },
{ n: 4, title: 'Community medicine in rural areas and tackling medical deserts', summary: 'Medical missions, mobile hospitals, free care campaigns, telemedicine and digitising primary care.' },
{ n: 5, title: 'Global responses to health crises: COVID, Ebola, HIV/AIDS', summary: 'Global health surveillance, joint action against global threats, the place of African solutions.' },
{ n: 6, title: 'Access to medicines and essential products', summary: 'Local pharmaceutical production, entrepreneurship, subsidies and access to medicines for all.' },
{ n: 7, title: 'Artificial intelligence and smart diagnostics', summary: 'Telemedicine, distance learning, networking expertise, digital data and health sovereignty.' },
{ n: 8, title: 'Women’s leadership in the health sector', summary: 'Promoting gender and youth in public health policy.' }];


export const conferenceFormats: typeof fr.conferenceFormats = [
{ title: 'High-level panels', text: 'Eight in-person and online panels on the key themes chosen by the scientific committee.' },
{ title: 'Digital Health Expo', text: 'Stakeholders, NGOs, pharmacies, health start-ups, banks and insurers: a space for exhibitions and demonstrations.' },
{ title: 'B2B sessions', text: 'Business and partnership meetings between companies, institutions and project leaders.' },
{ title: 'Medical mission', text: 'A free medical assistance mission at Yaoundé General Hospital during the conference.' },
{ title: 'Educational talks', text: 'Discussion and training sessions for young people on preventive health and health inclusion.' },
{ title: '10th-anniversary gala', text: 'Presentation of the ICHH 2026 Awards, recognition of Mahola Health Foundation Ambassadors and special jury prizes.' }];


export const sponsorOffers: typeof fr.sponsorOffers = [
{ tier: 'Co-partner', amount: '80,000,000 FCFA' },
{ tier: 'Gold sponsor', amount: '50,000,000 FCFA' },
{ tier: 'Bronze sponsor', amount: '40,000,000 FCFA' },
{ tier: 'Silver sponsor', amount: '20,000,000 FCFA' },
{ tier: 'À la carte participation', amount: '5,000,000 FCFA' }];


export const organizingCommittee: Member[] = [
{ name: 'Ministry of Public Health (MINSANTE)', role: 'General supervision', organization: 'Republic of Cameroon' },
{ name: 'Dr Mathilde Mbouck', role: 'President — coordination', organization: 'Mahola Health Foundation' },
{ name: 'All Access Agency', role: 'General commissioner and project management', organization: 'Paris' },
{ name: 'MINSANTE coordination committee', role: 'Steering of the preparatory phase and technical secretariat', organization: 'MINSANTE' },
{ name: 'Inter-ministerial committee', role: 'Oversight of the organisation', organization: 'Government of Cameroon' }];


export const scientificCommittee: Member[] = [
{ name: 'Chair of the scientific committee', role: 'Inaugural lecture and final summary of proceedings', organization: 'To be appointed' },
{ name: 'Rapporteurs of the eight panels', role: 'Terms of reference, moderation and reporting', organization: 'Experts and academics' },
{ name: 'Technical secretariat', role: 'Data collection and drafting of the final report', organization: 'MINSANTE · All Access · Mahola' }];


export const maholaMission =
'To preserve and protect the health of people living in Cameroon and Central Africa by making primary health care easier to access.';

export const maholaContactText: Partial<typeof fr.maholaContact> = {
  addressCameroon: 'Avenue de l’Hippodrome, P.O. Box 15383, Yaoundé, Cameroon',
  addressUk: '26 Carminia Road, London SW17 8AH, United Kingdom'
};

export const maholaActions: typeof fr.maholaActions = [
{ title: 'Pop-up clinics', text: 'Setting up pop-up clinics in Cameroon so that as many people as possible can access primary health care.' },
{ title: 'Medicine collection', text: 'Collecting medicines from partners and donors, then redistributing them to the people and facilities that need them most.' },
{ title: 'Health prevention', text: 'Running awareness campaigns on good health practices, disease prevention and the importance of regular medical check-ups.' },
{ title: 'Support for orphanages', text: 'Providing care to children and staff, funding health insurance (with Onyx Insurance) and carrying out renovation work.' },
{ title: 'Strengthening health centres', text: 'Supporting local primary health centres by sharing expertise and training health professionals.' },
{ title: 'Medical equipment', text: 'Recovering and redistributing medical equipment to strengthen the capacity of local health facilities.' }];


export const maholaTimeline: TimelineEntry[] = [
{
  year: '2016',
  title: 'The Mahola Health Foundation is founded',
  description:
  'Under the leadership of Dr Mathilde Mbouck, a group of volunteer health workers founds Mahola to improve access to primary health care in Cameroon. The first medical mission opens a pop-up clinic and provides 899 consultations.',
  metric: '899 consultations'
},
{
  year: '2017',
  title: 'Second medical mission',
  description:
  'The pop-up clinic model takes shape: general and specialist consultations, distribution of medicines collected from partners and donors, and health prevention awareness.',
  metric: '1,345 consultations'
},
{
  year: '2018',
  title: 'Third medical mission',
  description:
  'The mission broadens its range of specialties — paediatrics, gynaecology, ophthalmology, physiotherapy — thanks to multidisciplinary volunteer teams.',
  metric: '1,520 consultations'
},
{
  year: '2019',
  title: 'Fourth mission and support for orphanages',
  description:
  'Alongside consultations, Mahola commits to long-term support for orphanages (care, health insurance with Onyx Insurance, renovation work) and for local health centres.',
  metric: '812 consultations'
},
{
  year: '2021',
  title: 'May mission and major medicine drive',
  description:
  'More than 400 kg of medicines are collected from partners and donors, then redistributed during the mission to clinic patients and partner health facilities.',
  metric: '400+ kg redistributed'
},
{
  year: '2022',
  title: 'Clinic mission and eyeglasses drive',
  description:
  'From 26 May to 4 June, the mission combines consultations, eye screening and the distribution of glasses, thanks to a volunteer optician.',
  metric: '26 May – 4 June'
},
{
  year: '2026',
  title: 'Ten years of solidarity and ICHH Yaoundé 2026',
  description:
  'Ten years after the first mission, Mahola has completed 12 medical missions, 8,700 consultations, 200 surgical procedures and 25 assisted births. The foundation celebrates this decade with ICHH Yaoundé 2026 at the Hilton Yaoundé.',
  metric: '10 years of action'
}];


export const maholaImpact: typeof fr.maholaImpact = [
{ value: '12', label: 'medical missions', detail: 'Carried out since 2016' },
{ value: '8,700', label: 'medical consultations', detail: 'Adults and children' },
{ value: '200', label: 'surgical procedures', detail: 'During missions' },
{ value: '25', label: 'assisted births', detail: 'Mother and child care' }];


export const testimonials: typeof fr.testimonials = [
{
  quote:
  'The mission sets up in our town for several days, and at last we can have the children examined without spending a whole day travelling to the city. Many families hadn’t seen a doctor in years.',
  name: 'Mrs R.',
  role: 'Mother, Centre region, Cameroon'
},
{
  quote:
  'Mahola doesn’t turn up with a ready-made plan: the team visits the health centre, asks what is missing, and trains our nurses while they are here.',
  name: 'Dr N.',
  role: 'Head of a health centre, Cameroon'
},
{
  quote:
  'I went as a volunteer ophthalmologist on the eyeglasses mission. In a few days we screened hundreds of people and fitted glasses for those who needed them.',
  name: 'Dr M.',
  role: 'Volunteer ophthalmologist, Mahola'
}];


/** Légendes de la galerie, indexées par image. */
export const galleryCaptions: Record<string, string> = {
  '/852a801e-42eb-409f-b6cc-eb5305f9f389.jpg': 'Paediatric consultation during a Mahola medical mission, Cameroon',
  '/2960c9bf-fa00-4f3d-a98f-c41b8d2d053f.jpg': 'Pop-up clinic and medicine distribution, Cameroon',
  '/9c6ef334-5f09-4f35-95c3-39cc504f79ea.jpg': 'Medical assistance mission in a community setting, Cameroon'
};

export const sponsors: Sponsor[] = [
{ name: 'MINSANTE — Republic of Cameroon', tier: 'Platine', origin: 'General supervision' },
{ name: 'Mahola Health Foundation', tier: 'Platine', origin: 'Coordination' },
{ name: 'All Access Agency', tier: 'Platine', origin: 'General commissioner' },
{ name: 'World Health Organization', tier: 'Or', origin: 'Technical partner' },
{ name: 'African Development Bank', tier: 'Or', origin: 'Financial partner' },
{ name: 'BDEAC', tier: 'Or', origin: 'Central Africa' },
{ name: 'UNAIDS · UNICEF · GIZ', tier: 'Argent', origin: 'International partners' },
{ name: 'Synergies Africaines', tier: 'Argent', origin: 'Civil society' }];


export const news: NewsItem[] = [
{
  id: 'n1',
  date: '15 September 2026',
  category: 'Programme',
  title: 'The eight high-level panels are announced',
  excerpt:
  'Health infrastructure, universal health coverage, community medicine, artificial intelligence, women’s leadership: the programme for the two days at the Hilton Yaoundé is online.'
},
{
  id: 'n2',
  date: '1 September 2026',
  category: 'Partnerships',
  title: 'The participation offer is open',
  excerpt:
  'Co-partner, sponsor, Health Expo stand or table at the 10th-anniversary gala: ICHH Yaoundé 2026 participation packages are available on request.'
},
{
  id: 'n3',
  date: '20 August 2026',
  category: 'Mahola',
  title: 'Ten years of the Mahola Health Foundation',
  excerpt:
  '12 medical missions, 8,700 consultations, 200 surgical procedures, 25 assisted births and more than €150,000 mobilised since 2016.'
},
{
  id: 'n4',
  date: '5 August 2026',
  category: 'Medical mission',
  title: 'A medical mission at Yaoundé General Hospital',
  excerpt:
  'During the conference, a free medical assistance mission will be held in the Cameroonian capital, continuing Mahola’s work on the ground.'
}];


export const footerLinks: typeof fr.footerLinks = [
{
  title: 'Conference',
  links: [
  { label: 'About', to: '/a-propos' },
  { label: 'Programme', to: '/programme' },
  { label: 'Speakers', to: '/speakers' },
  { label: 'Mahola at 10', to: '/mahola' }]

},
{
  title: 'Take part',
  links: [
  { label: 'Register', to: '/programme' },
  { label: 'Become a partner', to: '/a-propos' },
  { label: 'Health Expo', to: '/a-propos' },
  { label: 'ICHH 2026 Awards', to: '/a-propos' }]

},
{
  title: 'Practical info',
  links: [
  { label: 'Venue and access', to: '/a-propos' },
  { label: 'Accommodation', to: '/a-propos' },
  { label: 'Visas and invitations', to: '/a-propos' },
  { label: 'Press', to: '/a-propos' }]

}];
