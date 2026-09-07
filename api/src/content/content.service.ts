import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ContentEntry } from './entities/content-entry.entity';
import { Singleton } from './entities/singleton.entity';
import { CollectionDef, ContentDef, getDef, REGISTRY } from './registry';
import { validateData } from './content.validation';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Singleton) private readonly singletons: Repository<Singleton>,
    @InjectRepository(ContentEntry) private readonly entries: Repository<ContentEntry>,
  ) {}

  private def(key: string): ContentDef {
    const d = getDef(key);
    if (!d) throw new NotFoundException(`Contenu inconnu : ${key}`);
    return d;
  }

  /** Objet de contenu complet, structuré comme les données statiques du site. */
  async getAggregate(): Promise<Record<string, unknown>> {
    const [singletons, entries] = await Promise.all([
      this.singletons.find(),
      this.entries.find({ order: { collection: 'ASC', position: 'ASC' } }),
    ]);
    const singletonMap = new Map(singletons.map((s) => [s.key, s.data]));

    const result: Record<string, unknown> = {};
    for (const def of REGISTRY) {
      if (def.kind === 'singleton') {
        const data = (singletonMap.get(def.key) as Record<string, unknown>) ?? {};
        // le singleton "maholaMission" est exposé comme simple chaîne
        result[def.key] = def.key === 'maholaMission' ? (data.text ?? '') : data;
      } else {
        const items = entries.filter((e) => e.collection === def.key).map((e) => e.data);
        result[def.key] = def.flattenTo ? items.map((it) => it[def.flattenTo as string]) : items;
      }
    }
    // le site vitrine attend `footerLinks` (tableau), stocké dans le singleton `footer`
    result.footerLinks = (result.footer as { groups?: unknown })?.groups ?? [];
    return result;
  }

  // ------------------------------------------------------------- Singletons
  async getSingleton(key: string) {
    const def = this.def(key);
    if (def.kind !== 'singleton') throw new BadRequestException(`${key} n'est pas un contenu unique.`);
    const row = await this.singletons.findOne({ where: { key } });
    return { key, data: row?.data ?? {}, updatedAt: row?.updatedAt ?? null };
  }

  async putSingleton(key: string, data: Record<string, unknown>) {
    const def = this.def(key);
    if (def.kind !== 'singleton') throw new BadRequestException(`${key} n'est pas un contenu unique.`);
    const clean = validateData(def, data);
    const row = (await this.singletons.findOne({ where: { key } })) ?? this.singletons.create({ key });
    row.data = clean;
    await this.singletons.save(row);
    return this.getSingleton(key);
  }

  // ------------------------------------------------------------- Collections
  private collectionDef(key: string): CollectionDef {
    const def = this.def(key);
    if (def.kind !== 'collection') throw new BadRequestException(`${key} n'est pas une liste.`);
    return def;
  }

  async listCollection(key: string) {
    this.collectionDef(key);
    return this.entries.find({ where: { collection: key }, order: { position: 'ASC' } });
  }

  async createEntry(key: string, data: Record<string, unknown>) {
    const def = this.collectionDef(key);
    const clean = validateData(def, data);
    const max = await this.entries
      .createQueryBuilder('e')
      .where('e.collection = :key', { key })
      .select('MAX(e.position)', 'max')
      .getRawOne<{ max: number | null }>();
    const entry = this.entries.create({
      collection: key,
      data: clean,
      position: (max?.max ?? -1) + 1,
    });
    return this.entries.save(entry);
  }

  async updateEntry(key: string, id: string, data: Record<string, unknown>) {
    const def = this.collectionDef(key);
    const entry = await this.entries.findOne({ where: { id, collection: key } });
    if (!entry) throw new NotFoundException('Élément introuvable');
    entry.data = validateData(def, { ...entry.data, ...data });
    return this.entries.save(entry);
  }

  async deleteEntry(key: string, id: string) {
    this.collectionDef(key);
    const res = await this.entries.delete({ id, collection: key });
    if (!res.affected) throw new NotFoundException('Élément introuvable');
    return { deleted: true };
  }

  async reorder(key: string, ids: string[]) {
    this.collectionDef(key);
    const rows = await this.entries.find({ where: { id: In(ids), collection: key } });
    if (rows.length !== ids.length) throw new BadRequestException('Liste d’identifiants invalide.');
    await Promise.all(
      ids.map((id, index) => this.entries.update({ id }, { position: index })),
    );
    return this.listCollection(key);
  }
}
