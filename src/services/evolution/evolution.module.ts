import { Module } from '@nestjs/common';
import { EvolutionService } from './evolution.service';
import { ApiCrud } from '../api-crud/api-crud.service';

@Module({
  providers: [EvolutionService, ApiCrud],
  exports: [EvolutionService],
})
export class EvolutionModule {}
