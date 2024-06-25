import { User } from "./user.entity";
import { Repository } from "typeorm";
import { AuthService } from "services/auth.service";
export declare class UserService {
    private readonly userRepository;
    private readonly authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    create(username: string, password: string, email: string, firstName: string, lastName: string): Promise<User>;
}
