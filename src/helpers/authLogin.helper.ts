import { User } from '../domain/user.entity';
import { LoginResponseI } from '../interfaces/login.interface';

export abstract class AuthLoginHelper {

  public static setUserCredentials(user: User, jwt: string){
    const credentials: LoginResponseI = {
      identifier: user.id,
      userName: user.userName,
      name: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
      roleId: user.role.id,
      accessToken: jwt,
    };

    return credentials;
  }
}