import { PaymentI } from '../interfaces/models/payment.interface';
import { MembershipDetails } from '../domain/membership-details.entity';
import { PaymentConcepts } from '../enums/concepts.enum';

export class PaymentHelper {
  public static newMember(memberId: number, userId: number, membershipDetails: MembershipDetails, discount?: number): PaymentI{
    //TODO: ADD LOGIC FOR MANAGE CODE DISCOUNT AND DISCOUNT AMOUNT
    return {
      concept: PaymentConcepts.NEW_MEMBERSHIP,
      amount: membershipDetails.price,
      memberId: memberId,
      userId: userId,
      disciplineId: membershipDetails.disciplineId,
      extraInformation: `${membershipDetails.description} - ${membershipDetails.name}`,
      discountId: discount ?? null,
      discountAmount: discount ?? null
    };
  }
}