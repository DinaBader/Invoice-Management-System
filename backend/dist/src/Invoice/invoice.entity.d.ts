export declare class Invoice {
    id: number;
    Description: string;
    CustomerName: string;
    Status: string;
    Total: number;
    Received: number;
    Remaining: number;
    createdAt: Date;
    updatedAt: Date;
    updateStatusIfTotalIsZero(): void;
}
