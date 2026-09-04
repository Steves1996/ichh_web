import type { Session } from '../types';

// Programme condensé sur deux jours (12-13 novembre 2026), d'après le pré-programme
// général du dossier d'offre de participation ICHH Yaoundé 2026 : cérémonie
// d'ouverture, huit panels de haut niveau, Salon Expo santé, sessions B2B,
// mission médicale et soirée de gala des 10 ans de la Mahola Health Foundation.
export const days = [
{ day: 1 as const, date: '12 novembre 2026', label: 'Jour 1', theme: 'Ouverture & premiers panels' },
{ day: 2 as const, date: '13 novembre 2026', label: 'Jour 2', theme: 'Panels, mission médicale & clôture' }];


export const sessions: Session[] = [
{
  id: 's101',
  day: 1,
  start: '08:30',
  end: '10:00',
  title: "Accueil des délégations et remise des kits",
  description:
  "Enregistrement des participants, remise des kits de conférence et orientation dans l’Hôtel Hilton de Yaoundé. Un espace café est ouvert dans le hall principal.",
  room: 'Hall du Hilton',
  track: 'Logistique',
  type: 'Networking',
  speakerIds: []
},
{
  id: 's102',
  day: 1,
  start: '10:00',
  end: '12:00',
  title: 'Cérémonie officielle d’ouverture',
  description:
  "Exécution de l’hymne national du Cameroun, mot de bienvenue du comité d’organisation, leçon inaugurale du président du comité scientifique, discours du Ministre de la Santé Publique et discours d’ouverture du représentant du gouvernement.",
  room: 'Salle plénière',
  track: 'Plénière',
  type: 'Cérémonie',
  speakerIds: ['sp-mbouck']
},
{
  id: 's103',
  day: 1,
  start: '12:30',
  end: '13:30',
  title: 'Ouverture du Salon Expo numérique santé',
  description:
  "Coupure du ruban du Salon Expo : ONG, pharmacies, start-ups santé, laboratoires, banques et assurances présentent leurs solutions. Cocktail sur invitation.",
  room: 'Salon Expo',
  track: 'Innovation',
  type: 'Exposition',
  speakerIds: []
},
{
  id: 's104',
  day: 1,
  start: '14:00',
  end: '15:30',
  title: 'Panel 1 — Infrastructures et équipements sanitaires en Afrique',
  description:
  "Évaluer les plateaux techniques africains face aux standards internationaux et envisager les solutions. Avec MINSANTE, MINEPAT, constructeurs, équipementiers, OMS, UNICEF, GIZ, BAD, BDEAC et la CEMAC.",
  room: 'Salle plénière',
  track: 'Infrastructures & équipements',
  type: 'Panel',
  speakerIds: ['sp-etoa']
},
{
  id: 's105',
  day: 1,
  start: '16:00',
  end: '17:30',
  title: 'Panel 2 — La médecine du volontariat dans les villes et villages',
  description:
  "Contribution du volontariat et de la RSE à l’accès aux soins des populations vulnérables : action pérenne ou transitoire ? Alternative ou complément à la Couverture Santé Universelle ?",
  room: 'Salle plénière',
  track: 'Médecine du volontariat',
  type: 'Panel',
  speakerIds: ['sp-mbouck', 'sp-nkolo']
},
{
  id: 's106',
  day: 1,
  start: '17:45',
  end: '19:00',
  title: 'Panel 3 — La Couverture Santé Universelle dans le développement des pays africains',
  description:
  "Le cas du Cameroun, l’exemple de la CNAMGS au Gabon, le rôle des banques et des assurances, le financement du chèque santé et les références internationales.",
  room: 'Salle des panels',
  track: 'Couverture Santé Universelle',
  type: 'Panel',
  speakerIds: ['sp-abena']
},
{
  id: 's107',
  day: 1,
  start: '19:00',
  end: '21:00',
  title: '1re soirée B2B — réseautage et promotion des entreprises',
  description:
  "Rencontres d’affaires et de partenariat entre entreprises, institutions, bailleurs et porteurs de projets de santé, autour du Salon Expo.",
  room: 'Jardin du Hilton',
  track: 'Networking',
  type: 'Networking',
  speakerIds: []
},
{
  id: 's201',
  day: 2,
  start: '09:00',
  end: '10:15',
  title: 'Panel 4 — Médecine communautaire en milieu rural et déserts médicaux',
  description:
  "Rôle des missions médicales en milieu rural, promotion de la médecine de proximité et des hôpitaux mobiles, campagnes de soins gratuits, accélération de la télémédecine et de la digitalisation des soins primaires.",
  room: 'Salle plénière',
  track: 'Santé communautaire',
  type: 'Panel',
  speakerIds: ['sp-mbouck', 'sp-nkolo']
},
{
  id: 's202',
  day: 2,
  start: '10:30',
  end: '12:00',
  title: 'Panel 5 — Solutions globales face aux crises sanitaires : COVID, Ebola, VIH/SIDA',
  description:
  "Problématique de la veille sanitaire mondiale, mutualisation face aux menaces globales, développement des nouvelles technologies de recherche et prise en compte des solutions africaines.",
  room: 'Salle plénière',
  track: 'Sécurité sanitaire mondiale',
  type: 'Panel',
  speakerIds: ['sp-abena']
},
{
  id: 's203',
  day: 2,
  start: '10:00',
  end: '17:00',
  title: 'Mission médicale — Hôpital Général de Yaoundé',
  description:
  "Mission d’assistance médicale gratuite organisée pendant la conférence, dans la continuité de l’action de terrain de la Mahola Health Foundation. Consultations, chirurgie et suivi mère-enfant.",
  room: 'Hôpital Général de Yaoundé',
  track: 'Santé communautaire',
  type: 'Atelier',
  speakerIds: []
},
{
  id: 's204',
  day: 2,
  start: '12:00',
  end: '13:00',
  title: 'Panel 6 — Accès aux médicaments et produits de première nécessité',
  description:
  "Nécessité de la production pharmaceutique locale, rôle de la pharmacie industrielle, promotion de l’entrepreneuriat, subvention et accès au médicament pour tous.",
  room: 'Salle des panels',
  track: 'Accès aux médicaments',
  type: 'Panel',
  speakerIds: []
},
{
  id: 's205',
  day: 2,
  start: '14:00',
  end: '15:15',
  title: 'Panel 7 — Intelligence artificielle et diagnostic intelligent',
  description:
  "Développement de la télémédecine et des outils de diagnostic intelligents, formation à distance, mise en réseau des compétences médicales, gestion des données numériques et souveraineté sanitaire de l’État.",
  room: 'Salle plénière',
  track: 'Santé numérique & IA',
  type: 'Panel',
  speakerIds: ['sp-fotso']
},
{
  id: 's206',
  day: 2,
  start: '15:30',
  end: '16:30',
  title: 'Panel 8 — Leadership des femmes dans le secteur de la santé',
  description:
  "Promotion du genre et des jeunes dans le secteur de la santé, et prise en compte de la composante genre et jeunesse dans les politiques publiques de gestion du système de santé.",
  room: 'Salle plénière',
  track: 'Genre & jeunesse',
  type: 'Panel',
  speakerIds: ['sp-atangana']
},
{
  id: 's207',
  day: 2,
  start: '16:45',
  end: '18:00',
  title: 'Cérémonie officielle de clôture — Déclaration de Yaoundé',
  description:
  "Lecture du rapport final de la conférence, message de remerciements aux autorités camerounaises, remise des attestations de participation et adoption de la Déclaration de Yaoundé.",
  room: 'Salle plénière',
  track: 'Plénière',
  type: 'Cérémonie',
  speakerIds: ['sp-mbouck']
},
{
  id: 's208',
  day: 2,
  start: '19:00',
  end: '23:00',
  title: 'Soirée de gala des 10 ans de la Mahola Health Foundation',
  description:
  "Prises de parole, animations artistiques, remise des Awards ICHH 2026 et des prix spéciaux du jury, et distinction des Ambassadeurs de la Mahola Health Foundation 2026.",
  room: 'Jardin du Hilton',
  track: 'Networking',
  type: 'Networking',
  speakerIds: []
}];


export const rooms = Array.from(new Set(sessions.map((s) => s.room)));
export const tracks = Array.from(new Set(sessions.map((s) => s.track)));
export const sessionTypes = Array.from(new Set(sessions.map((s) => s.type)));

export const getSessionsForSpeaker = (speakerId: string): Session[] =>
sessions.filter((s) => s.speakerIds.includes(speakerId));
