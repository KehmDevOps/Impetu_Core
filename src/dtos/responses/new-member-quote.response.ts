import { Expose } from 'class-transformer';

export class NewMemberQuoteResponse{
  @Expose()
  totalDiscount: number;

  @Expose()
  totalAmount: number;
}