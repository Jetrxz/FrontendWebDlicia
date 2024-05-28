import { tipoProductoTable } from "./productType.model";
import { tipoUnidadTable } from "./unitOfMesure.model";

export class ProductosTable {
    idProduct: number;
    productName: string | null;
    productDescription: string | null;
    imgProduct: string | null;
    price: number;
    productTypeId: number;
    unitOfMesureId: number;
    productType: tipoProductoTable;
    unitOfMesure: tipoUnidadTable;

    constructor() {
        this.idProduct = 0;
        this.productName = "";
        this.productDescription = "";
        this.imgProduct = "";
        this.price = 0;
        this.productTypeId = 0;
        this.unitOfMesureId = 0;
        this.unitOfMesure = new tipoUnidadTable();
        this.productType = new tipoProductoTable();
    } 
}