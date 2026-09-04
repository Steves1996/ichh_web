import type { Speaker } from '../types';

// Intervenants pressentis pour l'ICHH Yaoundé 2026. La liste définitive et les
// modérateurs de chaque panel sont arrêtés par le comité scientifique (mention
// « à désigner » dans le dossier d'offre de participation). Seule la présidente
// de la Mahola Health Foundation, le Dr Mathilde Mbouck, est confirmée.
export const speakers: Speaker[] = [
{
  id: 'sp-mbouck',
  name: 'Dr Mathilde Mbouck',
  role: 'Présidente',
  organization: 'Mahola Health Foundation',
  country: 'Cameroun',
  domain: 'Santé communautaire',
  image: "/02737108-f365-45eb-aaa5-70bc8003a298.jpg",
  bio: "Médecin et fondatrice de la Mahola Health Foundation en 2016, le Dr Mathilde Mbouck coordonne l’ICHH Yaoundé 2026. En dix ans, elle a conduit douze missions médicales au Cameroun et en Afrique centrale — plus de 8 700 consultations, 200 interventions chirurgicales et 25 accouchements assistés — en s’appuyant sur des équipes de bénévoles pluridisciplinaires et un modèle de dispensaire éphémère.",
  keynote: true,
  email: 'drmathilde@mahola-health.org',
  linkedin: 'linkedin.com/company/mahola-health',
  x: '@mahola_health',
  publications: [
  "Dix ans de missions médicales au Cameroun : bilan et méthode (2026)",
  "Le dispensaire éphémère comme réponse aux déserts médicaux (2024)"]

},
{
  id: 'sp-etoa',
  name: 'Intervenant — MINSANTE',
  role: 'Direction des infrastructures et équipements sanitaires',
  organization: 'Ministère de la Santé Publique (Cameroun)',
  country: 'Cameroun',
  domain: 'Infrastructures & équipements',
  image: "/8674b7e7-0d74-4cab-a7d1-18b94ed73a3b.jpg",
  bio: "Représentant du Ministère de la Santé Publique sur le Panel 1, consacré à l’évaluation des plateaux techniques africains face aux standards internationaux et aux solutions de modernisation des infrastructures, dans le cadre de la Stratégie Sectorielle de Santé 2020-2030.",
  keynote: false,
  email: 'contact@minsante.cm',
  linkedin: '',
  x: '',
  publications: []
},
{
  id: 'sp-nkolo',
  name: 'Intervenant — Médecine communautaire',
  role: 'Coordination des missions médicales en milieu rural',
  organization: 'Réseau des acteurs de santé communautaire',
  country: 'Cameroun',
  domain: 'Santé communautaire',
  image: "/041648e7-b1b8-478c-8c50-4e268238a909.jpg",
  bio: "Praticien de la médecine de proximité, cet intervenant partagera un retour d’expérience sur les hôpitaux mobiles, les campagnes de soins gratuits et la digitalisation des soins de santé primaire en zone rurale (Panels 2 et 4).",
  keynote: false,
  email: '',
  linkedin: '',
  x: '',
  publications: []
},
{
  id: 'sp-abena',
  name: 'Intervenant — Couverture Santé Universelle',
  role: 'Financement de la santé et assurance maladie',
  organization: 'Institutions financières et assurances (zone CEMAC)',
  country: 'Afrique centrale',
  domain: 'Couverture Santé Universelle',
  image: "/f4dab6ee-92e3-447c-bf42-052774b951f9.jpg",
  bio: "Spécialiste du financement de la santé, cet intervenant traitera de la mise en place de la CSU dans les pays africains : le cas du Cameroun, l’exemple de la CNAMGS au Gabon, le rôle des banques et des assurances et le financement du chèque santé (Panels 3 et 5).",
  keynote: false,
  email: '',
  linkedin: '',
  x: '',
  publications: []
},
{
  id: 'sp-fotso',
  name: 'Intervenant — Santé numérique',
  role: 'Intelligence artificielle et diagnostic intelligent',
  organization: 'Écosystème santé numérique (ANTIC, universités, start-ups)',
  country: 'Cameroun',
  domain: 'Santé numérique & IA',
  image: "/5133f875-89d0-4f1c-afb4-4cd0469a884a.jpg",
  bio: "Cet intervenant abordera le rôle de l’intelligence artificielle et des outils de diagnostic intelligents dans le développement des services de santé prioritaire : télémédecine, formation à distance, mise en réseau des compétences et souveraineté des données sanitaires (Panel 7).",
  keynote: false,
  email: '',
  linkedin: '',
  x: '',
  publications: []
},
{
  id: 'sp-atangana',
  name: 'Intervenante — Leadership et genre',
  role: 'Promotion du leadership des femmes en santé',
  organization: 'MINPROFF · ONU Femmes · associations de femmes',
  country: 'Cameroun',
  domain: 'Genre & jeunesse',
  image: "/cfbcf2b4-17b2-4be0-bb00-fd42d0bcdbe3.jpg",
  bio: "Cette intervenante portera le Panel 8 sur la promotion et le développement du leadership des femmes dans le secteur de la santé, et la prise en compte du genre et de la jeunesse dans les politiques publiques de santé.",
  keynote: false,
  email: '',
  linkedin: '',
  x: '',
  publications: []
}];


export const getSpeaker = (id: string): Speaker | undefined => speakers.find((s) => s.id === id);

export const speakerCountries = Array.from(new Set(speakers.map((s) => s.country))).sort();
export const speakerOrganizations = Array.from(new Set(speakers.map((s) => s.organization))).sort();
export const speakerDomains = Array.from(new Set(speakers.map((s) => s.domain))).sort();
