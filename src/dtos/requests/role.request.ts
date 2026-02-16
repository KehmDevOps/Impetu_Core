import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ValidationMessages } from '../../constants/validationMessages.constants';

export class RoleRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10, { message: ValidationMessages.Role.NameMaxLength })
  @MinLength(4, { message: ValidationMessages.Role.NameMinLength })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: ValidationMessages.Role.DescriptionMaxLength })
  @MinLength(10, { message: ValidationMessages.Role.DescriptionMinLength })
  description!: string;
}
