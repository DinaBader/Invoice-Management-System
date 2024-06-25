import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class Usercontroller{
    constructor(
        private readonly userService:UserService
    ){}

    @Post()
    async create(@Body() userData: any) {
        const { firstName, lastName, username, password, email } = userData;
        await this.userService.create(username, password, email, firstName, lastName);
        return { message: "User registered successfully" };
    }
    
}