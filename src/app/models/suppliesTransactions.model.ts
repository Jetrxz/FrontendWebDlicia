import { InsumosTable } from "./supplies.model";

export class transaccionesInsumosTable {
    idTransaction: number;
    idSupplie: number;
    quantity: number;
    transactionDate: Date;
    supplieBound: boolean;
    supplies: InsumosTable;

    constructor() {
        this.idTransaction = 0;
        this.idSupplie = 0;
        this.quantity = 0;
        this.transactionDate = new Date;
        this.supplieBound = true;
        this.supplies = new InsumosTable();
    } 
}