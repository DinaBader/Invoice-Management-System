import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./user.entity";
import { Usercontroller } from "./user.controller";
import { UserService } from "./user.service";
import { PasswordService } from "services/password.service";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[Usercontroller],
    providers:[UserService,PasswordService],
})
export class UserModule{

}