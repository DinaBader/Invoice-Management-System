import { InvoiceService } from "./invoice.service";
import { Invoice } from "./invoice.entity";
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    create(dto: any): Promise<Invoice>;
    findAll(): Promise<Invoice[]>;
    update(dto: any, id: number): Promise<Invoice>;
    getByStatus(status: string): Promise<Invoice[]>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
