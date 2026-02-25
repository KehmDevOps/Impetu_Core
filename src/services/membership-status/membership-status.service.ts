import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipStatus } from '../../domain/membership-status.entity';
import { QueryI } from '../../interfaces/query.interface';
import { SystemConstants } from '../../constants/system.constants';

@Injectable()
export class MembershipStatusService {
  constructor(
    @InjectRepository(MembershipStatus, SystemConstants.IMPETU_DB)
    private readonly membershipStatusRepository: Repository<MembershipStatus>,
  ) {}

  public async find(query: QueryI<MembershipStatus>): Promise<MembershipStatus[]> {
    return await this.membershipStatusRepository.find(query);
  }

  public async findOne(query: QueryI<MembershipStatus>): Promise<MembershipStatus | null> {
    return await this.membershipStatusRepository.findOne(query);
  }
}
