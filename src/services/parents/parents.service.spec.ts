import { Test, TestingModule } from '@nestjs/testing';
import { ParentsService } from './parents.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Parents } from '../../domain/parents.entity';
import { SystemConstants } from '../../constants/system.constants';

describe('ParentsService', () => {
  let service: ParentsService;

  const mockParentsRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParentsService,
        {
          provide: getRepositoryToken(Parents, SystemConstants.IMPETU_DB),
          useValue: mockParentsRepository,
        },
      ],
    }).compile();

    service = module.get<ParentsService>(ParentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
