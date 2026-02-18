import { plainToInstance } from 'class-transformer';
import { UserResponse } from '../dtos/responses/user/user.response';

export class ObjectMapper {

  static toUserResponseList(results: any[]): UserResponse[] {
    const mappedResults: object[] = results.map(row => ({
      id: row.id,
      userName: row.userName,
      firstName: row.firstName,
      lastName: row.lastName,
      surName: row.surName,
      status: row.status,
      role: {
        id: row.roleId,
        name: row.roleName,
        description: row.roleDescription
      }
    }));

    return plainToInstance(UserResponse, mappedResults, { excludeExtraneousValues: true });
  }
}

