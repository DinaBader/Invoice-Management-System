import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

export class SignUpDto {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[]; // Ensure roles are properly defined
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
    const { username, password, email, firstName, lastName, roles } = signUpDto;
    return this.authService.signUp(username, password, email, firstName, lastName, roles);
  }
}