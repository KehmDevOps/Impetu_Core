import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RolesService } from '../../services/roles/roles.service';
import { plainToInstance } from 'class-transformer';
import { RoleResponse } from '../../dtos/responses/role/role.response';
import { Role } from '../../domain/roles.entity';
import { RoleRequest } from '../../dtos/requests/role.request';
import { GenericResponse } from '../../dtos/responses/generic/generic.response';
import { SystemErrorCodes } from '../../constants/systemErrorCodes.constants';
import { SystemErrorMessages } from '../../constants/systemErrorMessages.constants';
import { SystemMessages } from '../../constants/systemMessages.constants';

@Injectable()
export class CatalogService {
  constructor(
    private roleService: RolesService
  ) {}

  public async findAllRoles(){
    const roles: Role[] = await this.roleService.find({ where : { status: true } });
    return plainToInstance(RoleResponse, roles, { excludeExtraneousValues: true });
  }

  public async createRole(body: RoleRequest){
    const alreadyExist: Role | null = await this.roleService.findOne({ where: { name: body.name } });

    if (alreadyExist) {
      throw new BadRequestException(SystemErrorMessages.RoleAlreadyExist, SystemErrorCodes.RoleAlreadyExist);
    }

    const role: Role = await this.roleService.persist(body);
    await this.roleService.save(role);

    return new GenericResponse(HttpStatus.CREATED, SystemMessages.RoleCreated);
  }
}
