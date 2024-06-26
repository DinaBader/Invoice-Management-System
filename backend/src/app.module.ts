import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceModule } from './Invoice/invoice.module';
import { UserModule } from './User/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,      
      ],
      useFactory: (configService:ConfigService)=>({
        type:'mysql',
        host:configService.get('DB_HOST'),
        port:+configService.get('DB_PORT'),
        username:configService.get('DB_USERNAME'),
        password:configService.get('DB_PASSWORD'),
        database:configService.get('DB_NAME'),
        entities:[join(process.cwd(),'dist/**/*.entity.js')],
        synchronize:false,
      }),
      inject:[ConfigService],
    }),
    InvoiceModule,
    UserModule,
    AuthModule

  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
