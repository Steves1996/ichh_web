import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentEntry } from '../content/entities/content-entry.entity';
import { Singleton } from '../content/entities/singleton.entity';
import { REGISTRY } from '../content/registry';
import { UsersService } from '../users/users.service';
import SNAPSHOT from './snapshot.json';

const SOURCE = SNAPSHOT as Record<string, unknown>;

@Injectable()
export class SeedService {
  private readonly logger = new Logger('Seed');

  constructor(
    private readonly users: UsersService,
    @InjectRepository(Singleton) private readonly singletons: Repository<Singleton>,
    @InjectRepository(ContentEntry) private readonly entries: Repository<ContentEntry>,
  ) {}

  /** Crée le compte administrateur défini dans .env s'il n'existe pas encore. */
  async ensureAdminUser() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) return;
    if (await this.users.findByEmail(email)) return;
    await this.users.create(email, password, process.env.ADMIN_NAME ?? 'Administrateur');
    this.logger.log(`Compte administrateur créé : ${email}`);
  }

  /** Au premier démarrage : si aucune donnée en base, charge le contenu de référence. */
  async ensureContentSeeded() {
    const [s, e] = await Promise.all([this.singletons.count(), this.entries.count()]);
    if (s > 0 || e > 0) return;
    this.logger.log('Base de contenu vide — chargement du contenu de référence…');
    await this.seedContent(false);
  }

  /** Charge `snapshot.json`. Sans `force`, ne touche pas aux contenus déjà présents. */
  async seedContent(force: boolean) {
    for (const def of REGISTRY) {
      const source = SOURCE[def.key];
      if (source === undefined) continue;

      if (def.kind === 'singleton') {
        const existing = await this.singletons.findOne({ where: { key: def.key } });
        if (existing && !force) continue;
        const row = existing ?? this.singletons.create({ key: def.key });
        row.data = source as Record<string, unknown>;
        await this.singletons.save(row);
      } else {
        const count = await this.entries.count({ where: { collection: def.key } });
        if (count > 0 && !force) continue;
        if (force) await this.entries.delete({ collection: def.key });
        const items = (source as Record<string, unknown>[]) ?? [];
        await this.entries.save(
          items.map((data, position) =>
            this.entries.create({ collection: def.key, data, position }),
          ),
        );
      }
    }
    this.logger.log('Contenu chargé.');
  }
}
