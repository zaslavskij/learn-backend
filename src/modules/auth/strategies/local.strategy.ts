import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCleanWithPassword } from '@/modules/user/types/return-user.type';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    userMail: string,
    password: string,
  ): Promise<UserCleanWithPassword> {
    const user = await this.authService.validateUser(userMail, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
