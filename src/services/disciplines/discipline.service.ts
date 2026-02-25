import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discipline } from '../../domain/discipline.entity';
import { QueryI } from '../../interfaces/query.interface';
import { SystemConstants } from '../../constants/system.constants';

@Injectable()
export class DisciplineService {
  constructor(
    @InjectRepository(Discipline, SystemConstants.IMPETU_DB)
    private readonly disciplineRepository: Repository<Discipline>,
  ) {}

  public async find(query: QueryI<Discipline>): Promise<Discipline[]> {
    return await this.disciplineRepository.find(query);
  }

  public async findOne(query: QueryI<Discipline>): Promise<Discipline | null> {
    return await this.disciplineRepository.findOne(query);
  }
}
