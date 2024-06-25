import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";

@Controller('Invoice')
export class InvoiceController{
    constructor(private readonly invoiceService:InvoiceService){};

    @Post()
    create(@Body() dto){
        return this.invoiceService.createInvoice(dto);
    }

    @Get()
    findAll(){
        return this.invoiceService.findAllInvoices();
    }

    @Put(':id')
    update(@Body() dto,@Param() id:number){
        return this.invoiceService.editInvoice(id,dto);
    }

    @Get('status')
    getByStatus(@Body() status){
        return this.invoiceService.getInvoiceByStatus(status);
    }

    @Delete(':id')
    delete(@Param() id:number){
        return this.invoiceService.deleteInvoice(id);
    }
}