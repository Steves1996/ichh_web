import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type PartnerRequestStatus = 'nouveau' | 'en_cours' | 'traite';

/** Demande « Devenir partenaire » envoyée depuis le site vitrine (public). */
@Entity('partner_requests')
@Index(['status', 'createdAt'])
export class PartnerRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 160 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  phone: string;

  @Column({ type: 'varchar', length: 180 })
  email: string;

  /** Qualité de partenariat souhaitée / message libre. */
  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar', length: 16, default: 'nouveau' })
  status: PartnerRequestStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
