import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @Column({ type: 'varchar', default: '' })
  name: string;

  @Column({ type: 'varchar', default: 'admin' })
  role: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
