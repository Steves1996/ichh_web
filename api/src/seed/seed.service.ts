import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('Seed');

  constructor(private readonly users: UsersService) {}

  /** Crée le compte administrateur défini dans .env s'il n'existe pas encore. */
  async ensureAdminUser() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) return;
    const existing = await this.users.findByEmail(email);
    if (existing) return;
    await this.users.create(email, password, process.env.ADMIN_NAME ?? 'Administrateur');
    this.logger.log(`Compte administrateur créé : ${email}`);
  }
}
