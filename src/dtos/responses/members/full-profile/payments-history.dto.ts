import { Expose, Type } from 'class-transformer';

export class PaymentDto {
  @Expose()
  identifier: number;

  @Expose()
  paymentDate: string;

  @Expose()
  concept: string;

  @Expose()
  coupon: boolean; // TODO: Implementar cupones

  @Expose()
  paymentAmount: number;

  @Expose()
  disciplineName: string;

  @Expose()
  receivedBy: string;
}

export class PaymentsHistoryDto {
  @Expose()
  @Type(() => PaymentDto)
  recentPayments: PaymentDto[];

  @Expose()
  totalPayments: number;
}