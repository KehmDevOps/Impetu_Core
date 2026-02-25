import { Test, TestingModule } from '@nestjs/testing';
import { EvolutionService } from './evolution.service';
import { ApiCrud } from '../api-crud/api-crud.service';

describe('EvolutionService', () => {
  let service: EvolutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvolutionService, ApiCrud],
    }).compile();

    service = module.get<EvolutionService>(EvolutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
