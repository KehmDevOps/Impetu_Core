import { Expose } from 'class-transformer';

export class MembershipDetailsResponse {
  @Expose({ name: 'id' })
  identifier: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
