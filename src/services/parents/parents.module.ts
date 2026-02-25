import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parents } from '../../domain/parents.entity';
import { ParentsService } from './parents.service';
import { SystemConstants } from '../../constants/system.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Parents], SystemConstants.IMPETU_DB)],
  providers: [ParentsService],
  exports: [ParentsService],
})
export class ParentsModule {}
