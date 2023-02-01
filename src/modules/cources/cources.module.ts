import { Module } from '@nestjs/common';
import { CourcesService } from './cources.service';
import { CourcesController } from './cources.controller';
import { PrismaService } from '@/utils/prisma.service';

@Module({
  controllers: [CourcesController],
  providers: [CourcesService, PrismaService],
})
export class CourcesModule {}
