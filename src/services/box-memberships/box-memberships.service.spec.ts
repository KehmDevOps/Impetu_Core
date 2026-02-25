import { Test, TestingModule } from '@nestjs/testing';
import { BoxMembershipsService } from './box-memberships.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoxMembership } from '../../domain/box-membership.entity';
import { SystemConstants } from '../../constants/system.constants';

describe('BoxMembershipsService', () => {
  let service: BoxMembershipsService;

  const mockBoxMembershipRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoxMembershipsService,
        {
          provide: getRepositoryToken(BoxMembership, SystemConstants.IMPETU_DB),
          useValue: mockBoxMembershipRepository,
        },
      ],
    }).compile();

    service = module.get<BoxMembershipsService>(BoxMembershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
