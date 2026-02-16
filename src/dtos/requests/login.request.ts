import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @IsString()
  @IsNotEmpty()
  userName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
