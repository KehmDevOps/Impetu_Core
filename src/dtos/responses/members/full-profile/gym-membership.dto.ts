import { Expose } from 'class-transformer';

export class GymMembershipDto {
  @Expose()
  identifier: number;

  @Expose()
  status: string;

  @Expose()
  initialDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  expiredDays: number;

  @Expose()
  promotionMonths: number;

  @Expose()
  totalRenews: number;
}