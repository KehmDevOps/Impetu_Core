import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConstants } from '../../constants/system.constants';
import { UsersController } from './users.controller';
import { User } from '../../domain/user.entity';
import { RolesModule } from '../../services/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User], SystemConstants.IMPETU_DB), RolesModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
