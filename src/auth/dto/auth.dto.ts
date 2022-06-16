import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  // Validation Decorators
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // Validation Decorators
  @IsString()
  @IsNotEmpty()
  password: string;
}
