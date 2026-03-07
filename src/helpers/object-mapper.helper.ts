import { plainToInstance } from 'class-transformer';
import { UserResponse } from '../dtos/responses/user/user.response';
import { MembershipDetails } from '../domain/membership-details.entity';
import { NewMemberQuoteResponse } from '../dtos/responses/new-member-quote.response';
import { MembersByFilterResponse } from '../dtos/responses/members/members-by-filter.response';
import { FullMemberProfileResponse } from '../dtos/responses/members/full-profile/full-member-profile.response';
import { DateHelper } from './date.helper';
import { SystemConstants } from '../constants/system.constants';

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

  static toListMembersResponse(results: any[]): MembersByFilterResponse[] {
    const mappedResults: object[] = results.map((row: any) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name + ' ' + row.sur_name,
      discipline: row.name,
      extraInformation: row.description,
    }));

    return plainToInstance(MembersByFilterResponse, mappedResults, {
      excludeExtraneousValues: true,
    });
  }

  static formatFullMemberProfile(memberData: any, paymentsData: any[]): FullMemberProfileResponse {
    const currentDiscipline = memberData.disciplineName?.toUpperCase() || '';

    return {
      personalData: {
        identifier: memberData.identifier,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        surName: memberData.surName,
        personalPhone: memberData.personal_phone,
        emergencyPhone: memberData.emergency_phone,
        bornDate: memberData.bornDate,
        address: memberData.address,
        parent: memberData.parentId
          ? {
              identifier: memberData.parentId,
              description: memberData.parentDescription,
            }
          : null,
      },

      ...(currentDiscipline.includes(SystemConstants.DISCIPLINES.GYM) &&
        memberData.gymId && {
          gymMembership: {
            identifier: memberData.gymId,
            status: memberData.gymStatus,
            initialDate: memberData.gymInitialDate,
            endDate: memberData.gymEndDate,
            expiredDays: parseInt(memberData.gymExpiredDays || '0'),
            promotionMonths: parseInt(memberData.gymPromotionMonths || '0'),
            totalRenews: parseInt(memberData.gymTotalRenews || '0'),
          },
        }),

      ...(currentDiscipline.includes(SystemConstants.DISCIPLINES.BOX) &&
        memberData.boxId && {
          boxMembership: {
            identifier: memberData.boxId,
            status: memberData.boxStatus,
            initialDate: DateHelper.formatDateOnly(memberData.boxInitialDate),
            endDate: DateHelper.formatDateOnly(memberData.boxEndDate),
            expiredDays: parseInt(memberData.boxExpiredDays || '0'),
            remainingAccesses: parseInt(memberData.boxRemainingAccesses || '0'),
          },
        }),

      payments: {
        recentPayments: paymentsData.map((p) => ({
          identifier: p.identifier,
          paymentDate: p.paymentDate,
          concept: p.concept,
          coupon: !!p.coupon, //TODO: Verificar cupon
          paymentAmount: parseFloat(p.paymentAmount),
          disciplineName: p.disciplineName,
          receivedBy: `${p.receivedByFirst || ''}`.trim(),
        })),
        totalPayments: parseInt(memberData.totalPayments || '0'),
      },
    };
  }
}

