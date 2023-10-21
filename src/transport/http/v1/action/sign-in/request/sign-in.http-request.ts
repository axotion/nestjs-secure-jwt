import { IsString } from 'class-validator';

export class SignInHttpRequest {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
