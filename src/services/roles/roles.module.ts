import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../domain/roles.entity';
import { RolesService } from './roles.service';
import { SystemConstants } from '../../constants/system.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Role], SystemConstants.IMPETU_DB)],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
