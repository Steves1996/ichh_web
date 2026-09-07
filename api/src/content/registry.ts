/**
 * Registre de contenu — décrit tout le contenu éditable du site vitrine.
 *
 * - `singleton` : un seul enregistrement (objet), ex. les infos de l'événement.
 * - `collection` : une liste ordonnée d'éléments, ex. les panels, les actualités.
 *
 * Ce registre pilote : la validation côté API, le formulaire dynamique du
 * back-office, et l'agrégat exposé par `GET /content`.
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'image'
  | 'url'
  | 'email'
  | 'select'
  | 'string-list'
  | 'json';

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  options?: string[]; // pour type 'select'
}

export interface SingletonDef {
  key: string;
  kind: 'singleton';
  label: string;
  group: string;
  fields: FieldDef[];
}

export interface CollectionDef {
  key: string;
  kind: 'collection';
  label: string;
  group: string;
  /** champ utilisé comme libellé de l'élément dans les listes du back-office */
  titleField: string;
  /** si défini, l'agrégat renvoie un tableau de chaînes prises dans ce champ */
  flattenTo?: string;
  fields: FieldDef[];
}

export type ContentDef = SingletonDef | CollectionDef;

const SESSION_TYPES = ['Cérémonie', 'Keynote', 'Panel', 'Atelier', 'Exposition', 'Networking'];
const SPONSOR_TIERS = ['Platine', 'Or', 'Argent'];

export const REGISTRY: ContentDef[] = [
  // ---------------------------------------------------------------- Conférence
  {
    key: 'event',
    kind: 'singleton',
    label: 'Événement',
    group: 'Conférence',
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'shortName', label: 'Nom court', type: 'text' },
      { name: 'fullName', label: 'Intitulé complet (EN)', type: 'text' },
      { name: 'fullNameFr', label: 'Intitulé complet (FR)', type: 'text' },
      { name: 'edition', label: 'Édition / accroche', type: 'text' },
      { name: 'theme', label: 'Thème (FR)', type: 'textarea' },
      { name: 'themeEn', label: 'Thème (EN)', type: 'textarea' },
      { name: 'slogan', label: 'Slogan', type: 'textarea' },
      { name: 'city', label: 'Ville', type: 'text' },
      { name: 'country', label: 'Pays', type: 'text' },
      { name: 'venue', label: 'Lieu', type: 'text' },
      { name: 'dates', label: 'Dates (affichage)', type: 'text' },
      { name: 'startIso', label: 'Date/heure de début (ISO)', type: 'text', required: true, help: 'ex. 2026-11-12T08:30:00 — pilote le compte à rebours' },
      { name: 'expectedParticipants', label: 'Participants attendus', type: 'text' },
    ],
  },
  {
    key: 'president',
    kind: 'singleton',
    label: 'Présidence',
    group: 'Conférence',
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'role', label: 'Fonction', type: 'text' },
    ],
  },
  {
    key: 'keyFigures',
    kind: 'collection',
    label: 'Chiffres clés (accueil)',
    group: 'Conférence',
    titleField: 'label',
    fields: [
      { name: 'value', label: 'Valeur', type: 'text', required: true },
      { name: 'label', label: 'Libellé', type: 'text', required: true },
      { name: 'detail', label: 'Détail', type: 'text' },
    ],
  },
  {
    key: 'reasons',
    kind: 'collection',
    label: 'Pourquoi participer',
    group: 'Conférence',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'text', label: 'Texte', type: 'textarea', required: true },
    ],
  },
  {
    key: 'objectives',
    kind: 'collection',
    label: 'Objectifs',
    group: 'Conférence',
    titleField: 'text',
    flattenTo: 'text',
    fields: [{ name: 'text', label: 'Objectif', type: 'textarea', required: true }],
  },
  {
    key: 'audiences',
    kind: 'collection',
    label: 'À qui s’adresse l’ICHH',
    group: 'Conférence',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'text', label: 'Texte', type: 'textarea', required: true },
    ],
  },
  {
    key: 'outcomes',
    kind: 'collection',
    label: 'Résultats attendus',
    group: 'Conférence',
    titleField: 'label',
    fields: [
      { name: 'label', label: 'Titre', type: 'text', required: true },
      { name: 'text', label: 'Texte', type: 'textarea', required: true },
    ],
  },
  {
    key: 'panels',
    kind: 'collection',
    label: 'Panels de haut niveau',
    group: 'Conférence',
    titleField: 'title',
    fields: [
      { name: 'n', label: 'Numéro', type: 'number', required: true },
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'summary', label: 'Résumé', type: 'textarea' },
    ],
  },
  {
    key: 'conferenceFormats',
    kind: 'collection',
    label: 'Formats de la conférence',
    group: 'Conférence',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'text', label: 'Texte', type: 'textarea', required: true },
    ],
  },
  {
    key: 'sponsorOffers',
    kind: 'collection',
    label: 'Formules de partenariat',
    group: 'Conférence',
    titleField: 'tier',
    fields: [
      { name: 'tier', label: 'Formule', type: 'text', required: true },
      { name: 'amount', label: 'Montant', type: 'text', required: true },
    ],
  },
  {
    key: 'sponsors',
    kind: 'collection',
    label: 'Partenaires et institutions',
    group: 'Conférence',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'tier', label: 'Niveau', type: 'select', options: SPONSOR_TIERS, required: true },
      { name: 'origin', label: 'Origine / rôle', type: 'text' },
    ],
  },
  {
    key: 'organizers',
    kind: 'collection',
    label: 'Organisation (gouvernance)',
    group: 'Conférence',
    titleField: 'name',
    fields: [
      { name: 'role', label: 'Rôle', type: 'text', required: true },
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'detail', label: 'Détail', type: 'text' },
    ],
  },
  {
    key: 'organizingCommittee',
    kind: 'collection',
    label: 'Comité d’organisation',
    group: 'Conférence',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'role', label: 'Rôle', type: 'text' },
      { name: 'organization', label: 'Organisation', type: 'text' },
    ],
  },
  {
    key: 'scientificCommittee',
    kind: 'collection',
    label: 'Comité scientifique',
    group: 'Conférence',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'role', label: 'Rôle', type: 'text' },
      { name: 'organization', label: 'Organisation', type: 'text' },
    ],
  },
  {
    key: 'news',
    kind: 'collection',
    label: 'Actualités',
    group: 'Conférence',
    titleField: 'title',
    fields: [
      { name: 'id', label: 'Identifiant', type: 'text', required: true, help: 'court, unique, ex. n1' },
      { name: 'date', label: 'Date (affichage)', type: 'text', required: true },
      { name: 'category', label: 'Catégorie', type: 'text', required: true },
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'excerpt', label: 'Résumé', type: 'textarea', required: true },
    ],
  },
  {
    key: 'footer',
    kind: 'singleton',
    label: 'Pied de page (liens)',
    group: 'Conférence',
    fields: [
      {
        name: 'groups',
        label: 'Groupes de liens',
        type: 'json',
        help: 'Tableau JSON : [{ "title": "Conférence", "links": [{ "label": "À propos", "to": "/a-propos" }] }]',
      },
    ],
  },

  // ---------------------------------------------------------------- Programme
  {
    key: 'days',
    kind: 'collection',
    label: 'Journées du programme',
    group: 'Programme',
    titleField: 'label',
    fields: [
      { name: 'day', label: 'Numéro de jour', type: 'number', required: true },
      { name: 'date', label: 'Date', type: 'text', required: true },
      { name: 'label', label: 'Libellé', type: 'text', required: true },
      { name: 'theme', label: 'Thème du jour', type: 'text' },
    ],
  },
  {
    key: 'sessions',
    kind: 'collection',
    label: 'Sessions du programme',
    group: 'Programme',
    titleField: 'title',
    fields: [
      { name: 'id', label: 'Identifiant', type: 'text', required: true, help: 'unique, ex. s104' },
      { name: 'day', label: 'Jour', type: 'number', required: true },
      { name: 'start', label: 'Début (HH:MM)', type: 'text', required: true },
      { name: 'end', label: 'Fin (HH:MM)', type: 'text', required: true },
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'room', label: 'Salle', type: 'text' },
      { name: 'track', label: 'Thématique', type: 'text' },
      { name: 'type', label: 'Type', type: 'select', options: SESSION_TYPES, required: true },
      { name: 'speakerIds', label: 'Intervenants (identifiants)', type: 'string-list', help: 'identifiants de speakers, ex. sp-mbouck' },
    ],
  },

  // ---------------------------------------------------------------- Intervenants
  {
    key: 'speakers',
    kind: 'collection',
    label: 'Intervenants',
    group: 'Intervenants',
    titleField: 'name',
    fields: [
      { name: 'id', label: 'Identifiant', type: 'text', required: true, help: 'unique, ex. sp-mbouck' },
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'role', label: 'Fonction', type: 'text' },
      { name: 'organization', label: 'Organisation', type: 'text' },
      { name: 'country', label: 'Pays', type: 'text' },
      { name: 'domain', label: 'Domaine', type: 'text' },
      { name: 'image', label: 'Photo', type: 'image' },
      { name: 'bio', label: 'Biographie', type: 'textarea' },
      { name: 'keynote', label: 'Keynote', type: 'boolean' },
      { name: 'email', label: 'E-mail', type: 'email' },
      { name: 'linkedin', label: 'LinkedIn', type: 'text' },
      { name: 'x', label: 'X / Twitter', type: 'text' },
      { name: 'publications', label: 'Publications', type: 'string-list' },
    ],
  },

  // ---------------------------------------------------------------- Mahola
  {
    key: 'maholaMission',
    kind: 'singleton',
    label: 'Mission Mahola',
    group: 'Mahola',
    fields: [{ name: 'text', label: 'Mission', type: 'textarea', required: true }],
  },
  {
    key: 'maholaContact',
    kind: 'singleton',
    label: 'Contacts Mahola',
    group: 'Mahola',
    fields: [
      { name: 'email', label: 'E-mail', type: 'email' },
      { name: 'emailPresidency', label: 'E-mail présidence', type: 'email' },
      { name: 'phoneCameroon', label: 'Téléphone Cameroun', type: 'text' },
      { name: 'phoneUk', label: 'Téléphone Royaume-Uni', type: 'text' },
      { name: 'addressCameroon', label: 'Adresse Cameroun', type: 'text' },
      { name: 'addressUk', label: 'Adresse Royaume-Uni', type: 'text' },
      { name: 'instagram', label: 'Instagram (URL)', type: 'url' },
    ],
  },
  {
    key: 'maholaActions',
    kind: 'collection',
    label: 'Missions de Mahola',
    group: 'Mahola',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'text', label: 'Texte', type: 'textarea', required: true },
    ],
  },
  {
    key: 'maholaTimeline',
    kind: 'collection',
    label: 'Frise chronologique',
    group: 'Mahola',
    titleField: 'title',
    fields: [
      { name: 'year', label: 'Année', type: 'text', required: true },
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'metric', label: 'Métrique', type: 'text' },
    ],
  },
  {
    key: 'maholaImpact',
    kind: 'collection',
    label: 'Chiffres d’impact',
    group: 'Mahola',
    titleField: 'label',
    fields: [
      { name: 'value', label: 'Valeur', type: 'text', required: true },
      { name: 'label', label: 'Libellé', type: 'text', required: true },
      { name: 'detail', label: 'Détail', type: 'text' },
    ],
  },
  {
    key: 'testimonials',
    kind: 'collection',
    label: 'Témoignages',
    group: 'Mahola',
    titleField: 'name',
    fields: [
      { name: 'quote', label: 'Citation', type: 'textarea', required: true },
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'role', label: 'Fonction', type: 'text' },
    ],
  },
  {
    key: 'gallery',
    kind: 'collection',
    label: 'Galerie',
    group: 'Mahola',
    titleField: 'caption',
    fields: [
      { name: 'src', label: 'Image', type: 'image', required: true },
      { name: 'caption', label: 'Légende', type: 'text' },
    ],
  },
];

export const REGISTRY_BY_KEY: Record<string, ContentDef> = Object.fromEntries(
  REGISTRY.map((d) => [d.key, d]),
);

export function getDef(key: string): ContentDef | undefined {
  return REGISTRY_BY_KEY[key];
}
