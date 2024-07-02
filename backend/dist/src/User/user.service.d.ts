import { User } from "./user.entity";
import { Repository } from "typeorm";
import { PasswordService } from "services/password.service";
export declare class UserService {
    private readonly userRepository;
    private readonly passwordService;
    constructor(userRepository: Repository<User>, passwordService: PasswordService);
    findOne(username: string): Promise<User | undefined>;
    createUser(username: string, hashedPassword: string, firstName: string, lastName: string): Promise<User>;
    getUsername(id: number): Promise<string>;
}
