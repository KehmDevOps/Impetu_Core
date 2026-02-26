import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from '../../domain/members.entity';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { SystemConstants } from '../../constants/system.constants';
import { EvolutionModule } from '../../services/evolution/evolution.module';
import { MembershipsModule } from '../../services/memberships/memberships.module';
import { MembershipDetailsModule } from '../../services/membership-details/membership-details.module';
import { BoxMembershipsModule } from '../../services/box-memberships/box-memberships.module';
import { PaymentsModule } from '../../services/payments/payments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Members], SystemConstants.IMPETU_DB),
    MembershipsModule,
    MembershipDetailsModule,
    BoxMembershipsModule,
    EvolutionModule,
    PaymentsModule
  ],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
