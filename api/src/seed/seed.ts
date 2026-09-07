/**
 * Seed manuel du contenu (le démarrage de l'API seede déjà une base vide).
 * Autonome : n'utilise pas NestJS, juste une connexion TypeORM + snapshot.json.
 *
 *   npm run seed            # remplit les tables vides
 *   npm run seed -- --force # réinitialise tout le contenu depuis snapshot.json
 *
 * Régénérer snapshot.json depuis le site : `npm run seed:snapshot` (monorepo).
 */
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import { AppDataSource } from '../database/data-source';
import { Singleton } from '../content/entities/singleton.entity';
import { ContentEntry } from '../content/entities/content-entry.entity';
import { User } from '../users/user.entity';
import { REGISTRY } from '../content/registry';
import SNAPSHOT from './snapshot.json';

dotenv.config();

const FORCE = process.argv.includes('--force');
const SOURCE = SNAPSHOT as Record<string, unknown>;

async function run() {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(); // crée les tables manquantes si besoin

  const singletonRepo = AppDataSource.getRepository(Singleton);
  const entryRepo = AppDataSource.getRepository(ContentEntry);
  const userRepo = AppDataSource.getRepository(User);

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
      const row = existing ?? singletonRepo.create({ key: def.key });
      row.data = source as Record<string, unknown>;
      await singletonRepo.save(row);
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
  console.log(FORCE ? '\nContenu réinitialisé.' : '\nSeed terminé.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
