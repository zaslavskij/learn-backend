import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { encodePassword } from '@/utils/bcrypt';
import {
  UserCleanNoPassword,
  UserCleanWithPassword,
  UserFromDb,
} from './types/return-user.type';
import { PrismaService } from '@/utils/prisma.service';
import { User } from '@prisma/client';
import { ManageUserDto } from './dto/manage-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto): Promise<UserCleanNoPassword> {
    const password = await encodePassword(user.password);

    const dbUser = await this.prisma.user.create({
      data: { ...user, password, roleId: 1 },
      include: { role: true },
    });

    return this.cleanUser(dbUser, true);
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.prisma.user.findMany({
      select: {
        email: true,
        role: true,
      },
    });

    return users;
  }

  async findByEmail(email: string): Promise<UserCleanWithPassword> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: email },
      include: {
        role: true,
      },
    });

    return this.cleanUser(user, false) as UserCleanWithPassword;
  }

  async changeUserRole(user: ManageUserDto) {
    if (user.role === 'ADMIN') {
      throw new BadRequestException('Bad request');
    }

    const role = await this.prisma.userRole.findFirst({
      where: { role: user.role },
    });

    try {
      const updatedUser = await this.prisma.user.update({
        where: { email: user.email },
        data: { role: { connect: { id: role.id } } },
        include: {
          role: true,
        },
      });

      return this.cleanUser(updatedUser, true);
    } catch (e) {
      throw new BadRequestException('Bad request');
    }
  }

  private cleanUser(
    dbUser: UserFromDb,
    isPasswordRemoved = true,
  ): UserCleanNoPassword | UserCleanWithPassword {
    const { email, password, role } = dbUser;
    return {
      email,
      ...(!isPasswordRemoved && { password }),
      role: role.role,
    };
  }
}
