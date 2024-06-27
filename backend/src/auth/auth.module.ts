import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UserModule } from 'src/User/user.module';
import { UserService } from 'src/User/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/User/user.entity';
import { PasswordModule } from 'services/password.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    PasswordModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  providers: [AuthService,UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
