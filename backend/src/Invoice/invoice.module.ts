import { Module } from "@nestjs/common";
import { Invoice } from "./invoice.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceService } from "./invoice.service";
import { InvoiceController } from "./invoice.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Invoice])],
    controllers:[InvoiceController],
    providers:[InvoiceService],
})
export class InvoiceModule{

}