import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from '../../domain/membership.entity';
import { QueryI } from '../../interfaces/query.interface';
import { SystemConstants } from '../../constants/system.constants';
import { DateHelper } from '../../helpers/date.helper';
import { MembershipStatusesEnum } from '../../enums/membership-statuses.enum';
import { SystemErrorMessages } from '../../constants/systemErrorMessages.constants';
import { SystemErrorCodes } from '../../constants/systemErrorCodes.constants';
import { MembershipStatusService } from '../membership-status/membership-status.service';
import { MembershipStatus } from '../../domain/membership-status.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership, SystemConstants.IMPETU_DB)
    private readonly membershipRepository: Repository<Membership>,
    private readonly membershipStatusService: MembershipStatusService,
  ) {}

  public async find(query: QueryI<Membership>): Promise<Membership[]> {
    return await this.membershipRepository.find(query);
  }

  public async findOne(query: QueryI<Membership>): Promise<Membership | null> {
    return await this.membershipRepository.findOne(query);
  }

  public async save(membership: Membership): Promise<Membership> {
    return await this.membershipRepository.save(membership);
  }

  public async persist(accessToken: string, userId: number, memberId: number, discountCode?: string): Promise<Membership> {
    const membershipStatus: MembershipStatus | null = await this.membershipStatusService.findOne({
      where: { name: MembershipStatusesEnum.VIGENT },
    });

    if (!membershipStatus) {
      throw new NotFoundException(SystemErrorMessages.MembershipStatusNotFound, SystemErrorCodes.MembershipStatusNotFound);
    }

    const today = new Date();

    return this.membershipRepository.create({
      createdAt: today,
      membershipStatus: membershipStatus,
      initialDate: today,
      endDate: DateHelper.addDays(today, 30),
      expiredDays: 0,
      promotionMonths: 1,
      totalRenews: 1,
      assistances: 0,
      isPromo: false, //TODO: Change this if Coupon Exist
      token: accessToken,
      promotionName: discountCode ?? SystemConstants.NO_PROMOTION, //TODO: Change this if Coupon Exist
      freeMonth: false,
      remainingAccesses: 0,
      createdBy: userId,
      memberId: memberId,
    });
  }
}
