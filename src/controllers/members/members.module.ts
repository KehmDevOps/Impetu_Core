import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from '../../domain/members.entity';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { SystemConstants } from '../../constants/system.constants';
import { EvolutionModule } from '../../services/evolution/evolution.module';
import { MembershipsModule } from '../../services/memberships/memberships.module';
import { MembershipStatusModule } from '../../services/membership-status/membership-status.module';

@Module({
  imports: [TypeOrmModule.forFeature([Members], SystemConstants.IMPETU_DB),
    MembershipsModule,
    EvolutionModule,
  ],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
