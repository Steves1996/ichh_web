import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Singleton } from '../content/entities/singleton.entity';
import { CreateRegistrationDto, UpdateRegistrationDto, UpdateRegistrationSettingsDto } from './dto';
import { Registration } from './registration.entity';

const REGISTRATION_SETTINGS_KEY = 'registrationSettings';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private readonly repo: Repository<Registration>,
    @InjectRepository(Singleton)
    private readonly singletons: Repository<Singleton>,
  ) {}

  async create(dto: CreateRegistrationDto) {
    const settings = await this.getSettings();
    if (!settings.isOpen) {
      throw new ConflictException('Les inscriptions sont actuellement fermées.');
    }

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

  async getSettings() {
    const row = await this.singletons.findOne({ where: { key: REGISTRATION_SETTINGS_KEY } });
    return { isOpen: row?.data.isOpen !== false };
  }

  async updateSettings(dto: UpdateRegistrationSettingsDto) {
    const row =
      (await this.singletons.findOne({ where: { key: REGISTRATION_SETTINGS_KEY } })) ??
      this.singletons.create({ key: REGISTRATION_SETTINGS_KEY });
    row.data = { ...row.data, isOpen: dto.isOpen };
    await this.singletons.save(row);
    return this.getSettings();
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
