import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Invoice'})
export class Invoice{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    Description:string;

    @Column()
    CustomerName:string;

    @Column()
    Status:string;

    @Column()
    Total:number;

    @Column()
    Received:number;

    @Column()
    Remaining:number;

    @Column()
    Date:Date;
}