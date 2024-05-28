export class tipoProductoTable {
    idProductType: number;
    productType: string | null;
    description: string | null;
    state: string | null;

    constructor() {
        this.idProductType = 0;
        this.productType = "";
        this.description = "";
        this.state = "";
    } 
}