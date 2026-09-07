import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !(await this.users.verifyPassword(user, password))) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return {
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  }
}
