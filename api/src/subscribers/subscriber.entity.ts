import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/** Adresse e-mail inscrite à la lettre d'information depuis le site vitrine. */
@Entity('subscribers')
export class Subscriber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 180 })
  email: string;

  /** true si l'e-mail de confirmation a bien été envoyé. */
  @Column({ type: 'boolean', default: false })
  notified: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
