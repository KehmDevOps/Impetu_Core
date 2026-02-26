import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoxMembership } from '../../domain/box-membership.entity';
import { QueryI } from '../../interfaces/query.interface';
import { SystemConstants } from '../../constants/system.constants';
import { DateHelper } from '../../helpers/date.helper';
import { MembershipStatusService } from '../membership-status/membership-status.service';
import { MembershipStatusesEnum } from '../../enums/membership-statuses.enum';
import { MembershipStatus } from '../../domain/membership-status.entity';
import { SystemErrorMessages } from '../../constants/systemErrorMessages.constants';
import { SystemErrorCodes } from '../../constants/systemErrorCodes.constants';
import { Members } from '../../domain/members.entity';

@Injectable()
export class BoxMembershipsService {
  constructor(
    @InjectRepository(BoxMembership, SystemConstants.IMPETU_DB)
    private readonly boxMembershipRepository: Repository<BoxMembership>,
    private readonly membershipStatus: MembershipStatusService
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

  public async persist(member: Members, remainingAccesses: number, createdBy: number): Promise<BoxMembership>{
    const today: Date = new Date();
    const membershipStatus: MembershipStatus | null = await this.membershipStatus.findOne({ where: { name: MembershipStatusesEnum.VIGENT}})

    if (!membershipStatus) {
      throw new NotFoundException(SystemErrorMessages.MembershipStatusNotFound, SystemErrorCodes.MembershipStatusNotFound);
    }

    return await this.boxMembershipRepository.save({
      memberId: member.id,
      membershipStatusId: membershipStatus.id,
      initialDate: today,
      endDate: DateHelper.addDays(today, 30),
      expiredDays: 0,
      remainingAccesses: remainingAccesses,
      token: member.token,
      createdBy: createdBy
    });
  }
}
