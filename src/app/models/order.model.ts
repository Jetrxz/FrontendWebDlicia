import { ClientTable } from "./client.model";
import { OrderStatesTable } from "./orderStates.model";

export class OrderTable {
    idOrder: number;
    idClient: number;
    orderDate: Date;
    total: number;
    idState: number;
    orderDeadline: Date;
    client: ClientTable;
    orderStates: OrderStatesTable;

    constructor() {
        this.idOrder = 0;
        this.idClient = 0;
        this.orderDate = new Date;
        this.total = 0;
        this.idState = 0;
        this.orderDeadline = new Date;
        this.client = new ClientTable();
        this.orderStates = new OrderStatesTable();
    } 
}