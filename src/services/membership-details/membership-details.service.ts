import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipDetails } from '../../domain/membership-details.entity';
import { QueryI } from '../../interfaces/query.interface';
import { SystemConstants } from '../../constants/system.constants';

@Injectable()
export class MembershipDetailsService {
  constructor(
    @InjectRepository(MembershipDetails, SystemConstants.IMPETU_DB)
    private readonly membershipDetailsRepository: Repository<MembershipDetails>,
  ) {}

  public async find(query: QueryI<MembershipDetails>): Promise<MembershipDetails[]> {
    return await this.membershipDetailsRepository.find(query);
  }

  public async findOne(query: QueryI<MembershipDetails>): Promise<MembershipDetails | null> {
    return await this.membershipDetailsRepository.findOne(query);
  }
}
