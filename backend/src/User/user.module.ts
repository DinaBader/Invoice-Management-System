import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./user.entity";
import { Usercontroller } from "./user.controller";
import { UserService } from "./user.service";
import { AuthService } from "services/auth.service";

@Module({
    imports:[TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([AuthService])],
    controllers:[Usercontroller],
    providers:[UserService,AuthService],
})
export class UserModule{

}