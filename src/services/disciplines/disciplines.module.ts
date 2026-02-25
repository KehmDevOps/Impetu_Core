import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from '../../domain/discipline.entity';
import { DisciplineService } from './discipline.service';
import { SystemConstants } from '../../constants/system.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline], SystemConstants.IMPETU_DB)],
  providers: [DisciplineService],
  exports: [DisciplineService],
})
export class DisciplinesModule {}
