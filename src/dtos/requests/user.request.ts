import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UserRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  surName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  @MinLength(3)
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(5)
  password!: string;
  
  @IsNotEmpty()
  @Min(1)
  roleId!: number;
}