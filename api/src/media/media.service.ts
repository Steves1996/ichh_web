import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaAsset } from './media-asset.entity';

@Injectable()
export class MediaService {
  constructor(@InjectRepository(MediaAsset) private readonly repo: Repository<MediaAsset>) {}

  private publicUrl(path: string) {
    const base = (process.env.PUBLIC_URL ?? 'http://localhost:3001').replace(/\/$/, '');
    return `${base}${path}`;
  }

  private serialize(a: MediaAsset) {
    return { ...a, url: this.publicUrl(a.path) };
  }

  async register(file: Express.Multer.File, alt = '') {
    const asset = this.repo.create({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: `/uploads/${file.filename}`,
      alt,
    });
    return this.serialize(await this.repo.save(asset));
  }

  async list() {
    const rows = await this.repo.find({ order: { createdAt: 'DESC' } });
    return rows.map((r) => this.serialize(r));
  }

  async remove(id: string) {
    const asset = await this.repo.findOne({ where: { id } });
    if (!asset) throw new NotFoundException('Média introuvable');
    const abs = join(process.cwd(), 'uploads', asset.filename);
    if (existsSync(abs)) unlinkSync(abs);
    await this.repo.delete({ id });
    return { deleted: true };
  }
}
