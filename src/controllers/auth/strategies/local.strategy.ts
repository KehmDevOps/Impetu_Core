import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ValidationError,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { validate } from 'class-validator';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../../../dtos/requests/login.request';
import { SystemErrorCodes } from '../../../constants/systemErrorCodes.constants';
import { SystemErrorMessages } from '../../../constants/systemErrorMessages.constants';
import { User } from '../../../domain/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
      passReqToCallback: true
    });
  }

  async validate(req: Request, userName: string, password: string): Promise<any> {
    const loginValidator: LoginRequest = new LoginRequest();
    loginValidator.userName = userName;
    loginValidator.password = password;

    const errors: ValidationError[] = await validate(loginValidator);
    
    if (errors?.length > 0) {
      throw new BadRequestException({ errors });
    }

    const user: User = await this.authService.validateUser(req, userName, password);
    
    if (!user) {
      throw new UnauthorizedException(SystemErrorMessages.Unauthorized, SystemErrorCodes.Unauthorized);
    }

    return user;
  }
}
