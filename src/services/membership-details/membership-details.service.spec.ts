import { Test, TestingModule } from '@nestjs/testing';
import { MembershipDetailsService } from './membership-details.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MembershipDetails } from '../../domain/membership-details.entity';
import { SystemConstants } from '../../constants/system.constants';

describe('MembershipDetailsService', () => {
  let service: MembershipDetailsService;

  const mockMembershipDetailsRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembershipDetailsService,
        {
          provide: getRepositoryToken(MembershipDetails, SystemConstants.IMPETU_DB),
          useValue: mockMembershipDetailsRepository,
        },
      ],
    }).compile();

    service = module.get<MembershipDetailsService>(MembershipDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
