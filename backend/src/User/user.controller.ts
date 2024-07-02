import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class Usercontroller{
    constructor(
        private readonly userService:UserService
    ){}
    
    @Get(":id")
    getUsername(@Param("id") id:number){
        return this.userService.getUsername(id);
    }
    
}