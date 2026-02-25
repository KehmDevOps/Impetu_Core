import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from '../../domain/membership.entity';
import { MembershipsService } from './memberships.service';
import { SystemConstants } from '../../constants/system.constants';
import { MembershipStatusModule } from '../membership-status/membership-status.module';

@Module({
  imports: [TypeOrmModule.forFeature([Membership], SystemConstants.IMPETU_DB),
  MembershipStatusModule],
  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}
