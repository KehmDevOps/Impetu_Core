import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { RoleRequest } from '../../dtos/requests/role.request';
import { Auth } from '../../decorators/auth.decorator';
import { ValidRoles } from '../../enums/valid-roles.enum';
import { RoleResponse } from '../../dtos/responses/role/role.response';
import { GenericResponse } from '../../dtos/responses/generic/generic.response';
import { DisciplineResponse } from '../../dtos/responses/discipline/discipline.response';
import { ParentsResponse } from '../../dtos/responses/parents/parents.response';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('roles')
  @Auth(ValidRoles.admin)
  public async findAllRoles(): Promise<RoleResponse[]> {
    return await this.catalogService.findAllRoles();
  }

  @Post('roles')
  @Auth(ValidRoles.admin)
  public async createRole(@Body() body: RoleRequest): Promise<GenericResponse> {
    return await this.catalogService.createRole(body);
  }

  @Get('disciplines/:disciplineId/membership-details')
  @Auth()
  public async getMembershipDetailsByDiscipline(
    @Param('disciplineId') disciplineId: number) {
    return await this.catalogService.getMembershipDetailsByDiscipline(disciplineId);
  }

  @Get('disciplines')
  @Auth()
  public async getDisciplines(): Promise<DisciplineResponse[]> {
    return await this.catalogService.getDisciplines();
  }

  @Get('parents')
  @Auth()
  public async getParents(): Promise<ParentsResponse[]> {
    return await this.catalogService.getParents();
  }
}
