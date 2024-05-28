import { tipoUsuariosTable } from "./usersType.model";

export class UsuariosTable {
    idUser: number;
    name: string;
    email: string;
    password: string;
    state: boolean;
    idUserType: number;
    usersType: tipoUsuariosTable;

    constructor() {
        this.idUser = 0;
        this.name = "";
        this.email = "";
        this.password = "";
        this.state = true;
        this.idUserType = 0;
        this.usersType = new tipoUsuariosTable();
    } 
}