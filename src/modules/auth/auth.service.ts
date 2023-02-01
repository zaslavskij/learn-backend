import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { checkPassword } from '../../utils/bcrypt';
import { UserService } from '../user/user.service';
import { UserCleanWithPassword } from '@/modules/user/types/return-user.type';
import { UserRoleEnum } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    userMail: string,
    pass: string,
  ): Promise<null | UserCleanWithPassword> {
    const user = await this.usersService.findByEmail(userMail);

    if (!user || (user && !checkPassword(pass, user.password))) {
      return null;
    }

    return user;
  }

  async signToken(user: { email: string; role: UserRoleEnum }) {
    return this.jwtService.sign(user);
  }
}
