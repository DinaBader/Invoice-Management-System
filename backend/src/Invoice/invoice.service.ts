import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invoice } from "./invoice.entity";
import { Repository } from "typeorm";

@Injectable()
export class InvoiceService{
    constructor(
        @InjectRepository(Invoice)
        private readonly invoiceRepository:Repository<Invoice>
    ){}

    async createInvoice(dto: Partial<Invoice>): Promise<Invoice> {
        try {
          const newInvoice = this.invoiceRepository.create(dto);
          const savedInvoice = await this.invoiceRepository.save(newInvoice);
          return savedInvoice;
        } catch (error) {
          console.error('Error creating invoice:', error);
          throw error; 
        }
    }

    async findAllInvoices(){
        try{
            const invoices = await this.invoiceRepository.find();
            return invoices;    
        }catch(error){
            console.error('Error getting invoice:',error);
            throw error;
        }
    }
    async editInvoice(id:number,dto:Partial<Invoice>):Promise<Invoice|undefined>{
        try{        
            const invoice=await this.invoiceRepository.findOne({where:{id}});
            Object.assign(invoice, dto);
            await this.invoiceRepository.save(invoice);
            return invoice;

        }catch(error){
            console.error('Error getting invoice:',error);
            throw error;
        }
    }
}