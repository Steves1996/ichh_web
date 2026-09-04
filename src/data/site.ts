import type { Member, NewsItem, Sponsor, TimelineEntry } from '../types';

// Source : « Dossier d'offre de participation — ICHH Yaoundé 2026 » (Mahola Health
// Foundation & All Access Agency, 2025-2026). La conférence officielle se tient à
// l'Hôtel Hilton de Yaoundé ; les dates affichées ici (12-13 novembre 2026) sont
// celles retenues par le client pour ce site.
export const event = {
  name: 'ICHH Yaoundé 2026',
  shortName: 'ICHH 2026',
  fullName: 'International Conference on Humanitarian Health',
  fullNameFr: 'Conférence Internationale sur la Santé Humanitaire',
  edition: '10 ans de la Mahola Health Foundation',
  theme: "Bâtir une santé résiliente pour les populations vulnérables en Afrique",
  themeEn: "Building Resilient Health for Vulnerable Populations in Africa",
  slogan: "Deux jours pour bâtir une santé résiliente au service des populations vulnérables d’Afrique.",
  city: 'Yaoundé',
  country: 'Cameroun',
  venue: 'Hôtel Hilton de Yaoundé',
  dates: '12 – 13 novembre 2026',
  startIso: '2026-11-12T08:30:00',
  expectedParticipants: '500'
};

export const organizers = [
{ role: 'Supervision générale', name: 'Ministère de la Santé Publique (MINSANTE)', detail: 'République du Cameroun' },
{ role: 'Coordination', name: 'Mahola Health Foundation', detail: 'Depuis 2016' },
{ role: 'Commissariat général', name: 'All Access Agency', detail: 'Ingénierie événementielle, Paris' }];


export const president = {
  name: 'Dr Mathilde Mbouck',
  role: 'Présidente, Mahola Health Foundation'
};

export const keyFigures = [
{ value: '10', label: 'ans de solidarité', detail: 'Mahola Health Foundation, depuis 2016' },
{ value: '500', label: 'participants attendus', detail: 'Décideurs, experts, société civile' },
{ value: '8', label: 'panels de haut niveau', detail: 'Sur deux jours' },
{ value: '7', label: 'pays d’Afrique centrale', detail: 'Zone CEMAC-CEEAC' },
{ value: '12', label: 'missions médicales Mahola', detail: '8 700 consultations' }];


export const reasons = [
{
  title: 'Décideurs réunis',
  text: "États de la zone CEMAC-CEEAC, MINSANTE, institutions internationales (OMS, ONUSIDA, BAD, BDEAC), ordres professionnels et corps diplomatique autour d’une même table."
},
{
  title: 'Salon Expo santé',
  text: "Un salon expo numérique de la santé : ONG, pharmacies, start-ups, laboratoires, banques et assurances présentent leurs solutions et dispositifs."
},
{
  title: 'Opportunités d’affaires',
  text: "Des sessions B2B dédiées pour nouer des partenariats entre entreprises, bailleurs, institutions et porteurs de projets de santé."
},
{
  title: 'Prix de l’innovation',
  text: "Les Awards ICHH 2026 et le prix spécial de l’innovation en santé récompensent des dispositifs déjà déployés sur le terrain."
},
{
  title: 'Déclaration de Yaoundé',
  text: "Les travaux des huit panels alimentent le rapport final et une déclaration d’engagements portée par les délégations."
}];


export const objectives = [
"Faire un état des lieux des missions médicales et de la santé mobile en milieu rural, ainsi que de leur régulation au Cameroun.",
"Proposer des solutions aux enjeux de souveraineté sanitaire des États africains, en particulier de la zone CEMAC-CEEAC.",
"Formuler des recommandations pour la construction et le développement d’infrastructures mobiles de santé prioritaire.",
"Contribuer au Plan National Santé et à la Stratégie Sectorielle de Santé 2020-2030 (SND30), ainsi qu’à une stratégie sous-régionale de santé en milieu rural.",
"Promouvoir l’éducation à la santé préventive, notamment en milieu jeune, et le leadership des femmes dans le secteur.",
"Identifier et mobiliser les stratégies de financement de la santé communautaire et du volontariat."];


export const audiences = [
{ title: 'États et ministères', text: "MINSANTE, MINFI et ministères sectoriels du Cameroun et des pays de la zone CEMAC-CEEAC." },
{ title: 'Institutions internationales', text: "OMS, ONUSIDA, ONU, Union Africaine, CEA, BAD, BDEAC, GIZ, USAID, Synergies Africaines." },
{ title: 'Structures de santé', text: "Hôpitaux de référence et régionaux, laboratoires, pharmacies, CENAME, ordres nationaux et cliniques." },
{ title: 'Société civile', text: "ONG, associations, associations de consommateurs, syndicats et acteurs communautaires." },
{ title: 'Secteur privé et financeurs', text: "Entreprises, banques, assurances, industries pharmaceutiques, start-ups santé et partenaires au développement." }];


export const outcomes = [
{ label: 'Cartographie réglementaire', text: "Un état des lieux des outils réglementaires de la santé en milieu rural et de l’impact de la convergence des acteurs." },
{ label: 'Document-cadre des missions médicales', text: "Les conditions de déploiement des missions médicales : technologies, encadrement, data centres mobiles, énergies alternatives." },
{ label: 'Cadre de concertation', text: "Un dispositif national et multinational de concertation des missions médicales et de synergies d’action collective." },
{ label: 'Déclaration de Yaoundé', text: "Des recommandations sur la souveraineté sanitaire, la santé numérique, la santé des jeunes et le leadership des femmes, adossées au rapport final de la conférence." }];


// Les huit panels de haut niveau retenus par le comité scientifique (brochure ICHH Yaoundé 2026).
export const panels = [
{ n: 1, title: 'Infrastructures et équipements sanitaires en Afrique', summary: "Évaluer les plateaux techniques africains face aux standards internationaux et identifier les solutions." },
{ n: 2, title: 'La médecine du volontariat dans les villes et les villages', summary: "Contribution du volontariat et de la RSE à l’accès aux soins des populations vulnérables — alternative ou complément à la CSU ?" },
{ n: 3, title: 'La Couverture Santé Universelle dans le développement des pays africains', summary: "Le cas du Cameroun, l’exemple de la CNAMGS au Gabon, le rôle des banques et des assurances, le financement du chèque santé." },
{ n: 4, title: 'Médecine communautaire en milieu rural et lutte contre les déserts médicaux', summary: "Missions médicales, hôpitaux mobiles, campagnes de soins gratuits, télémédecine et digitalisation des soins primaires." },
{ n: 5, title: 'Solutions globales face aux crises sanitaires : COVID, Ebola, VIH/SIDA', summary: "Veille sanitaire mondiale, synergie face aux menaces globales, place des solutions africaines." },
{ n: 6, title: 'Accès aux médicaments et produits de première nécessité', summary: "Production pharmaceutique locale, entrepreneuriat, subvention et accès au médicament pour tous." },
{ n: 7, title: 'Intelligence artificielle et diagnostic intelligent', summary: "Télémédecine, formation à distance, mise en réseau des compétences, données numériques et souveraineté sanitaire." },
{ n: 8, title: 'Leadership des femmes dans le secteur de la santé', summary: "Promotion du genre et des jeunes dans les politiques publiques de santé." }];


export const conferenceFormats = [
{ title: 'Panels de haut niveau', text: "Huit panels en présentiel et en visioconférence sur les grandes thématiques retenues par le comité scientifique." },
{ title: 'Salon Expo numérique santé', text: "Acteurs, ONG, pharmacies, start-ups santé, banques et assurances : un espace d’exposition et de démonstration." },
{ title: 'Sessions B2B', text: "Rencontres d’affaires et de partenariat entre entreprises, institutions et porteurs de projets." },
{ title: 'Mission médicale', text: "Une mission d’assistance médicale gratuite organisée à l’Hôpital Général de Yaoundé pendant la conférence." },
{ title: 'Causeries éducatives', text: "Séances d’échange et de formation des jeunes à la santé préventive et à l’inclusion sanitaire." },
{ title: 'Soirée de gala des 10 ans', text: "Remise des Awards ICHH 2026, distinction des Ambassadeurs de la Mahola Health Foundation et prix spéciaux du jury." }];


export const sponsorOffers = [
{ tier: 'Co-partenaire', amount: '80 000 000 FCFA' },
{ tier: 'Sponsor Gold', amount: '50 000 000 FCFA' },
{ tier: 'Sponsor Bronze', amount: '40 000 000 FCFA' },
{ tier: 'Sponsor Argent', amount: '20 000 000 FCFA' },
{ tier: 'Participation à la carte', amount: '5 000 000 FCFA' }];


export const organizingCommittee: Member[] = [
{ name: 'Ministère de la Santé Publique (MINSANTE)', role: 'Supervision générale', organization: 'République du Cameroun' },
{ name: 'Dr Mathilde Mbouck', role: 'Présidente — coordination', organization: 'Mahola Health Foundation' },
{ name: 'All Access Agency', role: 'Commissariat général et maîtrise d’œuvre', organization: 'Paris' },
{ name: 'Comité de coordination MINSANTE', role: 'Pilotage de la phase préparatoire et secrétariat technique', organization: 'MINSANTE' },
{ name: 'Comité interministériel', role: 'Supervision de l’organisation', organization: 'Gouvernement du Cameroun' }];


export const scientificCommittee: Member[] = [
{ name: 'Président du comité scientifique', role: 'Leçon inaugurale et synthèse finale des travaux', organization: 'À désigner' },
{ name: 'Rapporteurs des huit panels', role: 'Termes de référence, animation et restitution', organization: 'Experts et universitaires' },
{ name: 'Secrétariat technique', role: 'Collecte des données et rédaction du rapport final', organization: 'MINSANTE · All Access · Mahola' }];


// Mahola — Mahola Health Foundation (mahola-health.org), présidée par le Dr Mathilde
// Mbouck. Depuis 2016, la fondation organise des missions médicales au Cameroun et
// en Afrique centrale pour réduire le déficit de soins des personnes à faibles revenus.
export const maholaMission =
"Préserver et protéger la santé des populations vivant au Cameroun et en Afrique centrale en leur facilitant l’accès aux soins de santé primaire.";

export const maholaContact = {
  email: 'info@mahola-health.org',
  emailPresidency: 'drmathilde@mahola-health.org',
  phoneCameroon: '+237 677 55 77 27',
  phoneUk: '+44 7742 522513',
  addressCameroon: 'Avenue de l’Hippodrome, B.P. 15383, Yaoundé, Cameroun',
  addressUk: '26 Carminia Road, London SW17 8AH, Royaume-Uni',
  instagram: 'https://www.instagram.com/allaccess2026'
};

export const maholaActions = [
{ title: 'Dispensaires éphémères', text: "Créer des dispensaires éphémères au Cameroun pour permettre au plus grand nombre l’accès aux soins de santé primaire." },
{ title: 'Collecte de médicaments', text: "Collecter des médicaments auprès de partenaires et donateurs, puis les redistribuer aux personnes et aux structures qui en ont le plus besoin." },
{ title: 'Prévention sanitaire', text: "Mener des campagnes de sensibilisation sur les bonnes pratiques de santé, la prévention des maladies et l’importance d’un suivi médical régulier." },
{ title: 'Soutien aux orphelinats', text: "Prodiguer des soins aux enfants et aux encadrants, financer une couverture santé (avec Onyx Insurance) et réaliser des travaux de rénovation." },
{ title: 'Renforcement des centres de santé', text: "Accompagner les centres de santé primaires locaux en transmettant l’expertise et en formant les professionnels de santé." },
{ title: 'Matériel médical', text: "Récupérer et redistribuer du matériel médical pour renforcer les capacités des structures de santé locales." }];


export const maholaTimeline: TimelineEntry[] = [
{
  year: '2016',
  title: 'Création de la Mahola Health Foundation',
  description:
  "Sous la présidence du Dr Mathilde Mbouck, un collectif de soignants bénévoles fonde Mahola pour faciliter l’accès aux soins de santé primaire au Cameroun. La première mission médicale ouvre un dispensaire éphémère et assure 899 consultations.",
  metric: '899 consultations'
},
{
  year: '2017',
  title: 'Deuxième mission médicale',
  description:
  "Le format du dispensaire éphémère se consolide : consultations généralistes et spécialisées, distribution de médicaments collectés auprès de partenaires et de donateurs, sensibilisation à la prévention sanitaire.",
  metric: '1 345 consultations'
},
{
  year: '2018',
  title: 'Troisième mission médicale',
  description:
  "La mission élargit la palette de spécialités mobilisées — pédiatrie, gynécologie, ophtalmologie, kinésithérapie — grâce à des équipes de bénévoles pluridisciplinaires.",
  metric: '1 520 consultations'
},
{
  year: '2019',
  title: 'Quatrième mission et soutien aux orphelinats',
  description:
  "En complément des consultations, Mahola engage un soutien durable aux orphelinats (soins, couverture santé avec Onyx Insurance, travaux de rénovation) et aux centres de santé locaux.",
  metric: '812 consultations'
},
{
  year: '2021',
  title: 'Mission de mai et grande collecte de médicaments',
  description:
  "Plus de 400 kg de médicaments sont collectés auprès de partenaires et de donateurs, puis redistribués lors de la mission, aux bénéficiaires du dispensaire comme aux structures de santé partenaires.",
  metric: '400+ kg redistribués'
},
{
  year: '2022',
  title: 'Mission dispensaire et collecte de lunettes',
  description:
  "Du 26 mai au 4 juin, la mission associe consultations, dépistage visuel et distribution de lunettes grâce à la mobilisation d’un opticien bénévole.",
  metric: '26 mai – 4 juin'
},
{
  year: '2026',
  title: 'Dix ans de solidarité et ICHH Yaoundé 2026',
  description:
  "Dix ans après la première mission, Mahola totalise 12 missions médicales, 8 700 consultations, 200 interventions chirurgicales et 25 accouchements assistés. La fondation célèbre cette décennie autour de l’ICHH Yaoundé 2026, au Hilton de Yaoundé.",
  metric: '10 ans d’action'
}];


export const maholaImpact = [
{ value: '12', label: 'missions médicales', detail: 'Réalisées depuis 2016' },
{ value: '8 700', label: 'consultations médicales', detail: 'Adultes et enfants' },
{ value: '200', label: 'interventions chirurgicales', detail: 'En mission' },
{ value: '25', label: 'accouchements assistés', detail: 'Suivi mère-enfant' }];


export const testimonials = [
{
  quote:
  "La mission s’installe plusieurs jours dans la commune et on peut enfin faire examiner les enfants sans partir toute une journée en ville. Beaucoup de familles n’avaient pas vu de médecin depuis des années.",
  name: 'Épouse R.',
  role: 'Mère de famille, région du Centre, Cameroun'
},
{
  quote:
  "Mahola ne débarque pas avec un programme tout fait : l’équipe passe voir le centre de santé, demande ce qui manque, et forme nos infirmiers pendant qu’elle est là.",
  name: 'Dr N.',
  role: 'Responsable de centre de santé, Cameroun'
},
{
  quote:
  "Je suis parti comme ophtalmologue bénévole sur la mission lunettes. En quelques jours, on a dépisté des centaines de personnes et équipé celles qui en avaient besoin.",
  name: 'Dr M.',
  role: 'Ophtalmologue bénévole, Mahola'
}];


export const gallery = [
{
  src: "/852a801e-42eb-409f-b6cc-eb5305f9f389.jpg",
  caption: 'Consultation pédiatrique lors d’une mission médicale Mahola, Cameroun'
},
{
  src: "/2960c9bf-fa00-4f3d-a98f-c41b8d2d053f.jpg",
  caption: 'Dispensaire éphémère et distribution de médicaments, Cameroun'
},
{
  src: "/9c6ef334-5f09-4f35-95c3-39cc504f79ea.jpg",
  caption: 'Mission d’assistance médicale en milieu communautaire, Cameroun'
}];


export const sponsors: Sponsor[] = [
{ name: 'MINSANTE — République du Cameroun', tier: 'Platine', origin: 'Supervision générale' },
{ name: 'Mahola Health Foundation', tier: 'Platine', origin: 'Coordination' },
{ name: 'All Access Agency', tier: 'Platine', origin: 'Commissariat général' },
{ name: 'Organisation mondiale de la Santé', tier: 'Or', origin: 'Partenaire technique' },
{ name: 'Banque africaine de développement', tier: 'Or', origin: 'Partenaire financier' },
{ name: 'BDEAC', tier: 'Or', origin: 'Afrique centrale' },
{ name: 'ONUSIDA · UNICEF · GIZ', tier: 'Argent', origin: 'Partenaires internationaux' },
{ name: 'Synergies Africaines', tier: 'Argent', origin: 'Société civile' }];


export const news: NewsItem[] = [
{
  id: 'n1',
  date: '15 septembre 2026',
  category: 'Programme',
  title: 'Les huit panels de haut niveau sont dévoilés',
  excerpt:
  "Infrastructures sanitaires, couverture santé universelle, médecine communautaire, intelligence artificielle, leadership des femmes : le programme des deux jours au Hilton de Yaoundé est en ligne."
},
{
  id: 'n2',
  date: '1 septembre 2026',
  category: 'Partenariats',
  title: 'Le dossier d’offre de participation est ouvert',
  excerpt:
  "Co-partenaire, sponsor, stand au Salon Expo santé ou table au gala des 10 ans : les formules de participation à l’ICHH Yaoundé 2026 sont disponibles sur demande."
},
{
  id: 'n3',
  date: '20 août 2026',
  category: 'Mahola',
  title: 'Dix ans de la Mahola Health Foundation',
  excerpt:
  "12 missions médicales, 8 700 consultations, 200 interventions chirurgicales, 25 accouchements assistés et plus de 150 000 € mobilisés depuis 2016."
},
{
  id: 'n4',
  date: '5 août 2026',
  category: 'Mission médicale',
  title: 'Une mission médicale à l’Hôpital Général de Yaoundé',
  excerpt:
  "Pendant la conférence, une mission d’assistance médicale gratuite sera organisée dans la capitale camerounaise, dans la continuité de l’action de terrain de Mahola."
}];


export const footerLinks = [
{
  title: 'Conférence',
  links: [
  { label: 'À propos', to: '/a-propos' },
  { label: 'Programme', to: '/programme' },
  { label: 'Speakers', to: '/speakers' },
  { label: 'Les 10 ans de Mahola', to: '/mahola' }]

},
{
  title: 'Participer',
  links: [
  { label: 'S’inscrire', to: '/programme' },
  { label: 'Devenir partenaire', to: '/a-propos' },
  { label: 'Salon Expo santé', to: '/a-propos' },
  { label: 'Awards ICHH 2026', to: '/a-propos' }]

},
{
  title: 'Pratique',
  links: [
  { label: 'Lieu et accès', to: '/a-propos' },
  { label: 'Hébergement', to: '/a-propos' },
  { label: 'Visas et invitations', to: '/a-propos' },
  { label: 'Presse', to: '/a-propos' }]

}];
