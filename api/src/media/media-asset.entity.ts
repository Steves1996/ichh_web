import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('media_assets')
export class MediaAsset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  filename: string;

  @Column({ type: 'varchar' })
  originalName: string;

  @Column({ type: 'varchar' })
  mimeType: string;

  @Column({ type: 'int' })
  size: number;

  /** chemin relatif servi statiquement, ex. /uploads/xxx.jpg */
  @Column({ type: 'varchar' })
  path: string;

  @Column({ type: 'varchar', default: '' })
  alt: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
