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
      return user;
    }
    async createUser(
      username: string,
      hashedPassword: string,
      firstName: string,
      lastName: string,
    ): Promise<User> {
      const newUser = this.userRepository.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
      });
      return this.userRepository.save(newUser);
    }
    
    async getUsername(id:number){
      try{
        const user = await this.userRepository.findOne({where : {id}});
        const name=user.firstName;
        return name;
      }catch(error){
        console.error("Couldn't find user ",error);
      }
    }
}