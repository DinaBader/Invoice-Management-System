import { Invoice } from "./invoice.entity";
import { Repository } from "typeorm";
export declare class InvoiceService {
    private readonly invoiceRepository;
    constructor(invoiceRepository: Repository<Invoice>);
    createInvoice(dto: Partial<Invoice>): Promise<Invoice>;
    findAllInvoices(): Promise<Invoice[]>;
    editInvoice(id: number, dto: Partial<Invoice>): Promise<Invoice | undefined>;
    getInvoiceByStatus(status: String): Promise<Invoice[]>;
    deleteInvoice(id: number): Promise<{
        message: string;
    }>;
}
