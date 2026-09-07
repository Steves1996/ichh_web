/**
 * Remplit la base à partir des données statiques actuelles du site vitrine
 * (../src/data/*). Idempotent : ne réécrit un contenu que s'il est vide,
 * sauf si l'option --force est passée.
 *
 *   npm run seed            # remplit les tables vides
 *   npm run seed -- --force # réinitialise tout le contenu
 */
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { AppDataSource } from '../database/data-source';
import { Singleton } from '../content/entities/singleton.entity';
import { ContentEntry } from '../content/entities/content-entry.entity';
import { User } from '../users/user.entity';
import { REGISTRY } from '../content/registry';
import * as bcrypt from 'bcryptjs';

import * as site from '../../../src/data/site';
import * as programme from '../../../src/data/programme';
import { speakers } from '../../../src/data/speakers';

dotenv.config();

const FORCE = process.argv.includes('--force');

/** valeurs source pour chaque clé du registre */
const SOURCE: Record<string, unknown> = {
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

async function run() {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(); // crée les tables manquantes si besoin
  const singletonRepo = AppDataSource.getRepository(Singleton);
  const entryRepo = AppDataSource.getRepository(ContentEntry);
  const userRepo = AppDataSource.getRepository(User);

  // -- compte admin
  const email = process.env.ADMIN_EMAIL;
  if (email && !(await userRepo.findOne({ where: { email: email.toLowerCase() } }))) {
    await userRepo.save(
      userRepo.create({
        email: email.toLowerCase(),
        passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD ?? 'changeme123', 10),
        name: process.env.ADMIN_NAME ?? 'Administrateur',
      }),
    );
    console.log(`✔ admin créé : ${email}`);
  }

  for (const def of REGISTRY) {
    const source = SOURCE[def.key];
    if (source === undefined) {
      console.warn(`… pas de données source pour ${def.key}`);
      continue;
    }

    if (def.kind === 'singleton') {
      const existing = await singletonRepo.findOne({ where: { key: def.key } });
      if (existing && !FORCE) {
        console.log(`= ${def.key} (déjà présent)`);
        continue;
      }
      await singletonRepo.save({ key: def.key, data: source as Record<string, unknown> });
      console.log(`✔ ${def.key}`);
    } else {
      const count = await entryRepo.count({ where: { collection: def.key } });
      if (count > 0 && !FORCE) {
        console.log(`= ${def.key} (${count} éléments déjà présents)`);
        continue;
      }
      if (FORCE) await entryRepo.delete({ collection: def.key });
      const items = (source as Record<string, unknown>[]) ?? [];
      await entryRepo.save(
        items.map((data, position) => entryRepo.create({ collection: def.key, data, position })),
      );
      console.log(`✔ ${def.key} (${items.length})`);
    }
  }

  await AppDataSource.destroy();
  console.log('\nSeed terminé.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
