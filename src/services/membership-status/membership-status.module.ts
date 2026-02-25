import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipStatus } from '../../domain/membership-status.entity';
import { MembershipStatusService } from './membership-status.service';
import { SystemConstants } from '../../constants/system.constants';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipStatus], SystemConstants.IMPETU_DB)],
  providers: [MembershipStatusService],
  exports: [MembershipStatusService],
})
export class MembershipStatusModule {}
