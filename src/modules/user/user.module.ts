import { PrismaService } from '@/utils/prisma.service';
import { Module } from '@nestjs/common';

import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
