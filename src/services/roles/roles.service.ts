import { Injectable } from '@nestjs/common';
import { Role } from '../../domain/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRequest } from '../../dtos/requests/role.request';
import { QueryI } from '../../interfaces/query.interface';
import { SystemConstants } from '../../constants/system.constants';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role, SystemConstants.IMPETU_DB)
    private readonly roleRepository: Repository<Role>
  ){}

  public async find(query: QueryI<Role>): Promise<Role[]> {
    return await this.roleRepository.find(query);
  }

  public async findOne(query: QueryI<Role>): Promise<Role | null> {
    return await this.roleRepository.findOne(query);
  }

  public async persist(role: RoleRequest): Promise<Role> {
    return this.roleRepository.create({
      name: role.name,
      description: role.description,
      status: true,
    });
  }

  public async save(role: Role): Promise<Role> {
    return await this.roleRepository.save(role);
  }
}
