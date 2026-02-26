export interface PaymentI {
  concept: string;
  amount: number;
  memberId: number;
  userId: number;
  disciplineId: number;
  extraInformation: string;
  discountId: number | null;
  discountAmount: number | null;
}