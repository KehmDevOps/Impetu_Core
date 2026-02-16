import {
  CanActivate,
  ExecutionContext, ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { SystemConstants } from '../../../constants/system.constants';
import { SystemErrorMessages } from '../../../constants/systemErrorMessages.constants';
import { SystemErrorCodes } from '../../../constants/systemErrorCodes.constants';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get(SystemConstants.META_ROLES, context.getHandler());
    const request = context.switchToHttp().getRequest();
    
    if(!request.user){
      throw new InternalServerErrorException(SystemErrorMessages.UserNotFoundInRequest,SystemErrorCodes.UserNotFoundInRequest);
    }

    if(validRoles.includes(request.user.role) || validRoles.length === 0){
      return true;
    }

    throw new ForbiddenException(SystemErrorMessages.UserHasInvalidRole, SystemErrorCodes.UserHasInvalidRole);
  }
}
