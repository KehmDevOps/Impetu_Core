import { SetMetadata } from '@nestjs/common';
import { SystemConstants } from '../constants/system.constants';
import { ValidRoles } from '../enums/valid-roles.enum';

export const RoleProtected = (...args: ValidRoles[]) => {

  return SetMetadata(SystemConstants.META_ROLES, args);
}
