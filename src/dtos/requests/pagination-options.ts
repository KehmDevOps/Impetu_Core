import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Order } from '../../enums/order.enum';
import { SystemErrorMessages } from '../../constants/systemErrorMessages.constants';

export class PaginationOptions {
  @IsOptional()
  @Type((): NumberConstructor => Number)
  @IsInt({ message: SystemErrorMessages.PageNotValid })
  page: number;

  @IsOptional()
  @Type((): NumberConstructor => Number)
  @IsInt({ message: SystemErrorMessages.LimitNotValid })
  limit: number;

  @IsOptional()
  @IsEnum(Order)
  order: string = Order.DESC;

  @IsOptional()
  @IsString()
  filter: string;
}
