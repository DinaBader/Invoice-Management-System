import { AuthService } from './auth.service';
export declare class SignUpDto {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
    signUp(signUpDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
}
