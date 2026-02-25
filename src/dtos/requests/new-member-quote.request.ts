import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class NewMemberQuoteRequest {
  @IsNumber()
  @IsNotEmpty()
  membershipDetailsId: number;

  @IsOptional()
  @IsString()
  discountCode?: string;
}
