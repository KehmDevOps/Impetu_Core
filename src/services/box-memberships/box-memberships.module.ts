import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxMembership } from '../../domain/box-membership.entity';
import { BoxMembershipsService } from './box-memberships.service';
import { SystemConstants } from '../../constants/system.constants';
import { MembershipStatusModule } from '../membership-status/membership-status.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoxMembership], SystemConstants.IMPETU_DB),
    MembershipStatusModule
  ],
  providers: [BoxMembershipsService],
  exports: [BoxMembershipsService],
})
export class BoxMembershipsModule {}
