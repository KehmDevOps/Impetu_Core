import { Test, TestingModule } from '@nestjs/testing';
import { MembershipsService } from './memberships.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Membership } from '../../domain/membership.entity';
import { SystemConstants } from '../../constants/system.constants';

describe('MembershipsService', () => {
  let service: MembershipsService;

  const mockMembershipRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembershipsService,
        {
          provide: getRepositoryToken(Membership, SystemConstants.IMPETU_DB),
          useValue: mockMembershipRepository,
        },
      ],
    }).compile();

    service = module.get<MembershipsService>(MembershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
