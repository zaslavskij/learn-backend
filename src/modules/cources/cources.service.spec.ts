import { PrismaService } from '@/utils/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CourcesService } from './cources.service';

describe('CourcesService', () => {
  let service: CourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourcesService, PrismaService],
    }).compile();

    service = module.get<CourcesService>(CourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
