import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

export class SignUpDto {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }


  @Post('signup')
  signUp(@Body() signUpDto :Record<string,any>){
    const { username, password, firstName, lastName} = signUpDto;
    return this.authService.signUp(username, password, firstName, lastName);
  }
}