import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponse } from '../../dtos/responses/user/user.response';
import { Auth } from '../../decorators/auth.decorator';
import { ValidRoles } from '../../enums/valid-roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  @Auth(ValidRoles.admin)
  async findAll(): Promise<UserResponse[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: number) {
    return await this.usersService.findUser(id);
  }
}
