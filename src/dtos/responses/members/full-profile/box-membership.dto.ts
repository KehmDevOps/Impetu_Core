import { Expose } from 'class-transformer';

export class BoxMembershipDto {
  @Expose()
  identifier: number;

  @Expose()
  status: string;

  @Expose()
  initialDate: string;

  @Expose()
  endDate: string;

  @Expose()
  expiredDays: number;

  @Expose()
  remainingAccesses: number;
}