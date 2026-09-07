/**
 * Génère `snapshot.json` à partir des données statiques du site vitrine
 * (`../../../src/data/*`). À lancer depuis le monorepo :
 *
 *   npm run seed:snapshot
 *
 * Le fichier produit est embarqué dans `api/` et utilisé par `seed.ts` — ce qui
 * rend le seed autonome (déploiement de l'API seule, sans le dossier `src/`).
 */
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as site from '../../../src/data/site';
import * as programme from '../../../src/data/programme';
import { speakers } from '../../../src/data/speakers';

const snapshot = {
  event: site.event,
  president: site.president,
  keyFigures: site.keyFigures,
  reasons: site.reasons,
  objectives: (site.objectives as string[]).map((text) => ({ text })),
  audiences: site.audiences,
  outcomes: site.outcomes,
  panels: site.panels,
  conferenceFormats: site.conferenceFormats,
  sponsorOffers: site.sponsorOffers,
  sponsors: site.sponsors,
  organizers: site.organizers,
  organizingCommittee: site.organizingCommittee,
  scientificCommittee: site.scientificCommittee,
  news: site.news,
  footer: { groups: site.footerLinks },
  days: programme.days,
  sessions: programme.sessions,
  speakers,
  maholaMission: { text: site.maholaMission },
  maholaContact: site.maholaContact,
  maholaActions: site.maholaActions,
  maholaTimeline: site.maholaTimeline,
  maholaImpact: site.maholaImpact,
  testimonials: site.testimonials,
  gallery: site.gallery,
};

const out = join(__dirname, 'snapshot.json');
writeFileSync(out, JSON.stringify(snapshot, null, 2) + '\n', 'utf8');
console.log(`snapshot écrit : ${out}`);
