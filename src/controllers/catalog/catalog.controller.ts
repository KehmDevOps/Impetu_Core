import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { RoleRequest } from '../../dtos/requests/role.request';
import { Auth } from '../../decorators/auth.decorator';
import { ValidRoles } from '../../enums/valid-roles.enum';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Auth()
  @Get('roles')
  public async findAllRoles() {
    return await this.catalogService.findAllRoles();
  }

  @Post('roles')
  @Auth(ValidRoles.admin)
  public async createRole(@Body() body: RoleRequest) {
    return await this.catalogService.createRole(body);
  }
}
