import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineService } from './discipline.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Discipline } from '../../domain/discipline.entity';

describe('DisciplinesService', () => {
  let service: DisciplineService;

  const mockDisciplineRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DisciplineService,
        {
          provide: getRepositoryToken(Discipline),
          useValue: mockDisciplineRepository,
        },
      ],
    }).compile();

    service = module.get<DisciplineService>(DisciplineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
