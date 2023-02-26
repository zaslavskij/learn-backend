import { PrismaService } from '@/utils/prisma.service';
import { Injectable } from '@nestjs/common';
import { Cource } from '@prisma/client';
import { CreateCourceDto } from './dto/create-cource.dto';
import { UpdateCourceDto } from './dto/update-cource.dto';
import { CourceClear } from './types/return.cource.type';

@Injectable()
export class CourcesService {
  constructor(private prisma: PrismaService) {}

  public async create(createCourceDto: CreateCourceDto): Promise<CourceClear> {
    const course = await this.prisma.cource.create({
      data: {
        title: createCourceDto.title,
        description: createCourceDto.description,
        ownerId: createCourceDto.ownerId,
      },
    });

    return this.cleanCource(course);
  }

  public async findAll(): Promise<CourceClear[]> {
    const cources = await this.prisma.cource.findMany();
    return cources.map((c) => this.cleanCource(c));
  }

  public findOne(id: number) {
    return this.prisma.cource.findUniqueOrThrow({ where: { id: id } });
  }

  public update(id: number) {
    return `This action updates a #${id} cource`;
  }

  public async remove(id: number) {
    const deletedCource = await this.prisma.cource.update({
      where: { id: id },
      data: { isDeleted: true },
    });

    return this.cleanCource(deletedCource);
  }

  private cleanCource(cource: Cource): CourceClear {
    const { id, title, ownerId, isDeleted } = cource;

    return { id, title, ownerId, isDeleted };
  }
}
