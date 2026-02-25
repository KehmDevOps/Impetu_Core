import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parents } from '../../domain/parents.entity';
import { QueryI } from '../../interfaces/query.interface';
import { SystemConstants } from '../../constants/system.constants';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parents, SystemConstants.IMPETU_DB)
    private readonly parentsRepository: Repository<Parents>,
  ) {}

  public async find(query?: QueryI<Parents>): Promise<Parents[]> {
    return await this.parentsRepository.find(query);
  }

  public async findOne(query: QueryI<Parents>): Promise<Parents | null> {
    return await this.parentsRepository.findOne(query);
  }

  public async save(parents: Parents): Promise<Parents> {
    return await this.parentsRepository.save(parents);
  }
}
