import { UserService } from "./user.service";
export declare class Usercontroller {
    private readonly userService;
    constructor(userService: UserService);
    getUsername(id: number): Promise<string>;
}
