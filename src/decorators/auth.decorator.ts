import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../enums/valid-roles.enum';
import { RoleProtected } from './role-protected.decorator';
import { AccessTokenGuard } from '../controllers/auth/guards/access-token.guard';
import { UserRoleGuard } from '../controllers/auth/guards/user-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AccessTokenGuard, UserRoleGuard)
  );
}