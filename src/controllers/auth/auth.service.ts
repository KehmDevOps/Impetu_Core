import {
  Injectable, InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import { User } from '../../domain/user.entity';
import { SystemErrorMessages } from '../../constants/systemErrorMessages.constants';
import { SystemErrorCodes } from '../../constants/systemErrorCodes.constants';
import { JwtPayloadI } from '../../interfaces/jwt-payload.interface';
import { AuthLoginHelper } from '../../helpers/authLogin.helper';
import { LoginResponseI } from '../../interfaces/login.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  async validateUser(req: Request, userName: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({
      where: { userName: userName },
      relations: {
        role: true,
      }
    });

    const userException: NotAcceptableException = new NotAcceptableException(
      SystemErrorMessages.UserInvalid,
      SystemErrorCodes.UserInvalid
    );

    if (!user || !user.status) {
      throw userException;
    }

    const stored = user.password; // Buffer

    if (!Buffer.isBuffer(stored)) {
      throw userException;
    }

    const storedHex = stored.toString('hex').toLowerCase();
    const digestHex = crypto.createHash('sha256').update(password, 'utf8').digest('hex').toLowerCase();

    if (storedHex !== digestHex) {
      throw userException;
    }

    return user;
  }

  public async login(user: User): Promise<LoginResponseI> {
    const jwt: string = await this.getJwtToken(user);
    return AuthLoginHelper.setUserCredentials(user, jwt);
  }

  private async getJwtToken(user: User) {
    const payLoad: JwtPayloadI = {
      identifier: user.id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      roleId: user.roleId,
      role: user.role.name,
    };

    return this.jwtService.signAsync({ ...payLoad});
  }

  public async checkAuthStatus(user: JwtPayloadI){
    const userMatch = await this.usersService.findOne({
      where: {id: user.identifier} ,
      relations: {
        role: true,
      }
    });

    if (!userMatch) {
      throw new InternalServerErrorException(SystemErrorMessages.UserNotFoundInRequest,SystemErrorCodes.UserNotFoundInRequest);
    }

    const jwt: string = await this.getJwtToken(userMatch);
    return AuthLoginHelper.setUserCredentials(userMatch, jwt);
  }
}
