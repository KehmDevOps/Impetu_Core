import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadI } from '../interfaces/jwt-payload.interface';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): JwtPayloadI | string => {
    const request = ctx.switchToHttp().getRequest();

    return data
      ? request.user?.[data]
      : request.user;
  },
);
