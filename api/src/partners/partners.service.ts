import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartnerRequestDto, UpdatePartnerRequestDto } from './dto';
import { PartnerRequest } from './partner-request.entity';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(PartnerRequest)
    private readonly repo: Repository<PartnerRequest>,
  ) {}

  async create(dto: CreatePartnerRequestDto) {
    const entity = this.repo.create({
      name: dto.name.trim(),
      phone: dto.phone.trim(),
      email: dto.email.trim().toLowerCase(),
      message: dto.message.trim(),
      status: 'nouveau',
    });
    await this.repo.save(entity);
    return { ok: true };
  }

  list() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: string, dto: UpdatePartnerRequestDto) {
    const row = await this.repo.findOne({ where: { id } });
    if (!row) throw new NotFoundException('Demande introuvable');
    if (dto.status) row.status = dto.status;
    return this.repo.save(row);
  }

  async remove(id: string) {
    const res = await this.repo.delete({ id });
    if (!res.affected) throw new NotFoundException('Demande introuvable');
    return { deleted: true };
  }
}
