import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { PasswordService } from "services/password.service";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
        private readonly passwordService: PasswordService,

    ){}

    async findOne(username: string): Promise<User | undefined> {
      const user = await this.userRepository.findOne({ where: { username } });
      console.log(`User found: ${JSON.stringify(user)}`);
      return user;
    }
                    
    async createUser(username: string, hashedPassword: string, email: string, firstName: string, lastName: string,): Promise<User> {
      const newUser = this.userRepository.create({
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
      });
      return this.userRepository.save(newUser);
    }
  
              
}