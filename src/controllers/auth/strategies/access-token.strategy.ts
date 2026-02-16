import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadI } from '../../../interfaces/jwt-payload.interface';
import { UsersService } from '../../users/users.service';
import { User } from '../../../domain/user.entity';
import { SystemErrorMessages } from '../../../constants/systemErrorMessages.constants';
import { SystemErrorCodes } from '../../../constants/systemErrorCodes.constants';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService
  ) {
    const secret: string | undefined = configService.get<string>('jwt.secret');

    if (!secret) {
      throw new Error(SystemErrorMessages.JwtSecretNotFound);
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayloadI): Promise<JwtPayloadI> {
    const user: User | null = await this.userService.findOne({
      where: { id: payload.identifier}
    });

    if(!user) {
      throw new NotFoundException(SystemErrorMessages.UserNotFound,SystemErrorCodes.UserNotFound);
    }

    if(!user.status) {
      throw new NotAcceptableException(SystemErrorMessages.UserInactive,SystemErrorCodes.UserInactive);
    }

    return payload;
  }
}
