import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipDetails } from '../../domain/membership-details.entity';
import { MembershipDetailsService } from './membership-details.service';
import { SystemConstants } from '../../constants/system.constants';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipDetails], SystemConstants.IMPETU_DB)],
  providers: [MembershipDetailsService],
  exports: [MembershipDetailsService],
})
export class MembershipDetailsModule {}
