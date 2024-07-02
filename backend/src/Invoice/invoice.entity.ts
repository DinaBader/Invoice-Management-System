import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Invoice'})
export class Invoice{
    @PrimaryGeneratedColumn()
    id:number;

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
    DueDate:string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; 



}