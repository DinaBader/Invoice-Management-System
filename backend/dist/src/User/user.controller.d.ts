import { UserService } from "./user.service";
export declare class Usercontroller {
    private readonly userService;
    constructor(userService: UserService);
    create(userData: any): Promise<{
        message: string;
    }>;
}
