import { plainToInstance } from 'class-transformer';
import { UserResponse } from '../dtos/responses/user/user.response';
import { MembershipDetails } from '../domain/membership-details.entity';
import { NewMemberQuoteResponse } from '../dtos/responses/new-member-quote.response';
import { MembersByFilterResponse } from '../dtos/responses/members/members-by-filter.response';

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

  static toNewMemberQuote(details: MembershipDetails, discount?: number): NewMemberQuoteResponse{
    const response = new NewMemberQuoteResponse();
    if (!discount) {
      response.totalAmount = details.price;
      response.totalDiscount = 0;
      return response;
    }

    response.totalDiscount = discount;
    response.totalAmount = details.price - discount;
    return response;
  }

  static toListMembersResponse(results: any[]){
    const mappedResults: object[] = results.map((row: any) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name + ' ' + row.sur_name,
      discipline: row.name,
      extraInformation: row.description
    }));

    return plainToInstance(MembersByFilterResponse, mappedResults, { excludeExtraneousValues: true });
  }
}

