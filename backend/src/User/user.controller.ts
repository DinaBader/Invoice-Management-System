import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class Usercontroller{
    constructor(
        private readonly userService:UserService
    ){}

    
}