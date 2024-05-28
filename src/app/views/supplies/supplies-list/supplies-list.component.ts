import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SuppliesTransactionsService } from '../../../core/supplies-transactions.service';
import { transaccionesInsumosTable } from '../../../models/suppliesTransactions.model';

@Component({
  selector: 'app-supplies-list',
  templateUrl: './supplies-list.component.html',
  styleUrl: './supplies-list.component.scss'
})
export class SuppliesListComponent implements OnInit {


  constructor(private suppliesTransactionService: SuppliesTransactionsService) { }
  mostrarTabla: boolean = false;
  dfecini: string = "";
  dfecfin: string = "";
  transacciones: transaccionesInsumosTable[] = [];
  habilitarExcel:boolean = false;

  ngOnInit(): void {
    const today = new Date();
    this.dfecini = this.formatDate(today);
    this.dfecfin = this.formatDate(today);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Añadir cero al mes
    const day = ('0' + date.getDate()).slice(-2); // Añadir cero al día
    return `${year}-${month}-${day}`;
  }

  async listarkardex() {
    try {
      const rpta:any = await this.suppliesTransactionService.buscarRegistros(this.dfecini,this.dfecfin).toPromise();
      this.transacciones = rpta;
      this.mostrarTabla = true;
      this.habilitarExcel = true;
    } catch (error) {
      Swal.fire(
        'Error',
        'Hubo un error ennla busqueda' + {error},
        'error'
      );
    }
  }
}
