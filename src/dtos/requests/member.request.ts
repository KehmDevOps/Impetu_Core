import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Genders } from '../../enums/genders.enum';
import { DateHelper } from '../../helpers/date.helper';

export class MemberRequest {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  surName: string;

  @IsEnum(Genders)
  gender: Genders;

  @IsDate()
  @Transform(({ value }) => {
    if (typeof value === 'string' && value.includes('/')) {
      return DateHelper.parseDDMMYYYY(value);
    }
    return value;
  })
  bornDate: Date;

  @IsString()
  address: string;

  @IsString()
  personalPhone: string;

  @IsString()
  emergencyPhone: string;

  @IsNumber()
  parentId: number;

  @IsNumber()
  membershipDetailsId: number;

  @IsOptional()
  @IsString()
  discountCode?: string;
}
