import { Test, TestingModule } from '@nestjs/testing';
import { MembershipStatusService } from './membership-status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MembershipStatus } from '../../domain/membership-status.entity';
import { SystemConstants } from '../../constants/system.constants';

describe('MembershipStatusService', () => {
  let service: MembershipStatusService;

  const mockMembershipStatusRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembershipStatusService,
        {
          provide: getRepositoryToken(MembershipStatus, SystemConstants.IMPETU_DB),
          useValue: mockMembershipStatusRepository,
        },
      ],
    }).compile();

    service = module.get<MembershipStatusService>(MembershipStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
