import { BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; 

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;  

    @BeforeUpdate()
    updateStatusIfTotalIsZero() {
        if (this.Total === 0 && this.Status !== 'paid') {
            this.Status = 'paid';
        }
    }

}