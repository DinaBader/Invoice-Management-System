import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user'})
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column({ unique: true })
    username: string;

   @Column()
   firstName:string
   
   @Column()
   lastName:string
   
   @Column()
   password:string

   
}