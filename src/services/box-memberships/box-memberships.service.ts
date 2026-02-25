import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoxMembership } from '../../domain/box-membership.entity';
import { QueryI } from '../../interfaces/query.interface';
import { SystemConstants } from '../../constants/system.constants';

@Injectable()
export class BoxMembershipsService {
  constructor(
    @InjectRepository(BoxMembership, SystemConstants.IMPETU_DB)
    private readonly boxMembershipRepository: Repository<BoxMembership>,
  ) {}

  public async find(query: QueryI<BoxMembership>): Promise<BoxMembership[]> {
    return await this.boxMembershipRepository.find(query);
  }

  public async findOne(query: QueryI<BoxMembership>): Promise<BoxMembership | null> {
    return await this.boxMembershipRepository.findOne(query);
  }

  public async save(boxMembership: BoxMembership): Promise<BoxMembership> {
    return await this.boxMembershipRepository.save(boxMembership);
  }
}
