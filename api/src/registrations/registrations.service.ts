import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationDto, UpdateRegistrationDto } from './dto';
import { Registration } from './registration.entity';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private readonly repo: Repository<Registration>,
  ) {}

  async create(dto: CreateRegistrationDto) {
    const entity = this.repo.create({
      fullName: dto.fullName.trim(),
      phone: dto.phone.trim(),
      city: dto.city.trim(),
      email: dto.email.trim().toLowerCase(),
      status: 'nouveau',
    });
    await this.repo.save(entity);
    return { ok: true };
  }

  list() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: string, dto: UpdateRegistrationDto) {
    const row = await this.repo.findOne({ where: { id } });
    if (!row) throw new NotFoundException('Inscription introuvable');
    if (dto.status) row.status = dto.status;
    return this.repo.save(row);
  }

  async remove(id: string) {
    const res = await this.repo.delete({ id });
    if (!res.affected) throw new NotFoundException('Inscription introuvable');
    return { deleted: true };
  }
}
