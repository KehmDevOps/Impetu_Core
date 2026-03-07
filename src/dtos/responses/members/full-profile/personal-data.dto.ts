import { Expose, Type } from 'class-transformer';

export class ParentDto {
  @Expose()
  identifier: number;

  @Expose()
  description: string;
}

export class PersonalDataDto {
  @Expose()
  identifier: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  surName: string;

  @Expose()
  personalPhone: string;

  @Expose()
  emergencyPhone: string;

  @Expose()
  bornDate: Date;

  @Expose()
  address: string;

  @Expose()
  @Type(() => ParentDto)
  parent?: ParentDto | null;
}