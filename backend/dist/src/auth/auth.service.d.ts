import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'services/password.service';
import { UserService } from 'src/User/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private passwordService;
    constructor(usersService: UserService, jwtService: JwtService, passwordService: PasswordService);
    signIn(username: string, pass: string): Promise<{
        access_token: string;
    }>;
    signUp(username: string, pass: string, email: string, firstName: string, lastName: string): Promise<{
        access_token: string;
    }>;
}
