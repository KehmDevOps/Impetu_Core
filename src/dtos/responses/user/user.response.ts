import { RoleResponse } from '../role/role.response';
import { Expose, Type } from 'class-transformer';

export class UserResponse {

  @Expose({ name: 'id' })
  identifier!: number;

  @Expose({ name: 'userName' })
  username!: string;

  @Expose({ name: 'firstName' })
  name!: string;

  @Expose({ name: 'lastName' })
  lastname!: string;

  @Expose({ name: 'surName' })
  surname!: string;

  @Expose()
  status!: boolean;

  @Expose()
  @Type(() => RoleResponse)
  role: RoleResponse
}
