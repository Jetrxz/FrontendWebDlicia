import { tipoUnidadTable } from "./unitOfMesure.model";

export class InsumosTable {
    idSupplie: number;
    supplieName: string | null;
    supplieDescription: string | null;
    quantity: number;
    supplieLot: number;
    lotDate: Date;
    unitOfMesureId: number;
    unitOfMesure: tipoUnidadTable;
    /**
     *
     */
    constructor() {
        this.idSupplie = 0;
        this.supplieName = "";
        this.supplieDescription = "";
        this.quantity = 0;
        this.supplieLot = 0;
        this.lotDate = new Date();
        this.unitOfMesureId = 0;
        this.unitOfMesure = new tipoUnidadTable();
    } 
}