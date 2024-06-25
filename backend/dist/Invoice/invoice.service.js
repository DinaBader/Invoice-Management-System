"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const invoice_entity_1 = require("./invoice.entity");
const typeorm_2 = require("typeorm");
let InvoiceService = class InvoiceService {
    constructor(invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    async createInvoice(dto) {
        try {
            const newInvoice = this.invoiceRepository.create(dto);
            const savedInvoice = await this.invoiceRepository.save(newInvoice);
            return savedInvoice;
        }
        catch (error) {
            console.error('Error creating invoice:', error);
            throw error;
        }
    }
    async findAllInvoices() {
        try {
            const invoices = await this.invoiceRepository.find();
            return invoices;
        }
        catch (error) {
            console.error('Error getting invoice:', error);
            throw error;
        }
    }
    async editInvoice(id, dto) {
        try {
            const invoice = await this.invoiceRepository.findOne({ where: { id } });
            Object.assign(invoice, dto);
            await this.invoiceRepository.save(invoice);
            return invoice;
        }
        catch (error) {
            console.error('Error getting invoice:', error);
            throw error;
        }
    }
    async getInvoiceByStatus(status) {
        try {
            const invoices = await this.invoiceRepository.find();
            const filteredInvoices = invoices.filter(invoice => invoice.Status === status);
            return filteredInvoices;
        }
        catch (error) {
            console.error("Error fetching invoices by status:", error);
            throw error;
        }
    }
    async deleteInvoice(id) {
        try {
            const invoice = await this.invoiceRepository.findOne({ where: { id } });
            if (!invoice) {
                throw new Error(`Invoice with id ${id} not found`);
            }
            await this.invoiceRepository.delete(invoice);
            return { message: 'Invoice deleted successfully' };
        }
        catch (error) {
            console.error("Error deleting invoice");
            throw error;
        }
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map