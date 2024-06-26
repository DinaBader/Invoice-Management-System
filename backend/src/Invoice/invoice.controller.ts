import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { Invoice } from "./invoice.entity";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/role.guard";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('Invoice')
@UseGuards(AuthGuard, RolesGuard)
export class InvoiceController{
    constructor(private readonly invoiceService:InvoiceService){};

    @Post()
    @Roles('admin')
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
    async getByStatus(@Query('status') status: string): Promise<Invoice[]> {
        return this.invoiceService.getInvoiceByStatus(status);
    }

    @Delete(':id')
    delete(@Param() id:number){
        return this.invoiceService.deleteInvoice(id);
    }
}