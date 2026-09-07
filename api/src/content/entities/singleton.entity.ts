import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

/** Contenu à enregistrement unique (objet), identifié par sa clé de registre. */
@Entity('singletons')
export class Singleton {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  key: string;

  @Column({ type: 'jsonb', default: {} })
  data: Record<string, unknown>;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
