import { Expose } from 'class-transformer';

export class MembersByFilterResponse {
  @Expose({ name: 'id'})
  identifier!: number;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  discipline!: string;

  @Expose()
  extraInformation!: string;
}