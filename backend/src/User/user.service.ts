import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { keycloakAdmin } from "keycloak-admin.config";
import { AuthService } from "services/auth.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
        private readonly authService: AuthService
    ){}

    async create(username: string, password: string, email: string, firstName: string, lastName: string) {
        try {
            const token = await this.authService.getToken();
            keycloakAdmin.setAccessToken(token);
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = {
                "username": username,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "enabled": true,
                "credentials": [
                    {
                        "type": "password",
                        "value": hashedPassword,
                        "temporary": false
                    }
                ]
            };
    
            console.log("Creating user with data:", userData);
    
            await keycloakAdmin.users.create(userData);
    
            const newUser = this.userRepository.create({
                username,
                password:hashedPassword,  
                email,
                firstName,  
                lastName,   
            });
    
            await this.userRepository.save(newUser);
    
            return newUser; 
        } catch (error) {
            console.error(`Failed to register user: ${error.message}`);
            console.error(`Error Response:`, error.response?.data);
            throw new Error("Failed to register user: " + error.message);
        }
    }
    
}