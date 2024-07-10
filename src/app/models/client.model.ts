export class ClientTable {
    idClient: number;
    clientName: string;
    cardId: string;
    phone: string;
    email: string;
    adress: string;
    
    constructor() {
        this.idClient = 0;
        this.clientName = "";
        this.cardId = "";
        this.phone = "";
        this.email = "";
        this.adress = "";
    } 
}