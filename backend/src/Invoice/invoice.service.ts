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

    async getInvoiceByStatus(status:String){
        try{
            const invoices=await this.invoiceRepository.find();
            const filteredInvoices =invoices.filter(invoice=>invoice.Status === status);
            return filteredInvoices ;
        }catch(error){
            console.error("Error fetching invoices by status:", error);
            throw error;
        }
    }

    async deleteInvoice(id:number){
        try{
            const invoice=await this.invoiceRepository.findOne({where:{id}});
            if (!invoice) {
                throw new Error(`Invoice with id ${id} not found`);
            }
            await this.invoiceRepository.remove(invoice);
            return { message: 'Invoice deleted successfully' };
        }catch(error){
            console.error("Error deleting invoice");
            throw error;
        }
    }

}