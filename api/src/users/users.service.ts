import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email: email.toLowerCase() } });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  count() {
    return this.repo.count();
  }

  async create(email: string, password: string, name = '', role = 'admin') {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email: email.toLowerCase(), passwordHash, name, role });
    return this.repo.save(user);
  }

  verifyPassword(user: User, password: string) {
    return bcrypt.compare(password, user.passwordHash);
  }
}
