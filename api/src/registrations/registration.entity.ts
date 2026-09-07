import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type RegistrationStatus = 'nouveau' | 'confirme' | 'annule';

/** Pré-inscription à l'ICHH Yaoundé 2026 envoyée depuis le site vitrine (public). */
@Entity('registrations')
@Index(['status', 'createdAt'])
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Nom et prénom. */
  @Column({ type: 'varchar', length: 160 })
  fullName: string;

  @Column({ type: 'varchar', length: 40 })
  phone: string;

  /** Ville de résidence. */
  @Column({ type: 'varchar', length: 120 })
  city: string;

  @Column({ type: 'varchar', length: 180 })
  email: string;

  @Column({ type: 'varchar', length: 16, default: 'nouveau' })
  status: RegistrationStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
