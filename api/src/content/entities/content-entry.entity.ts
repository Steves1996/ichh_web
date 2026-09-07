import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/** Un élément d'une collection ordonnée (panels, actualités, sessions, ...). */
@Entity('content_entries')
@Index(['collection', 'position'])
export class ContentEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64 })
  collection: string;

  @Column({ type: 'int', default: 0 })
  position: number;

  @Column({ type: 'jsonb', default: {} })
  data: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
