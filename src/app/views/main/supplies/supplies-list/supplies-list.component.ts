import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SuppliesTransactionsService } from '../../../../core/supplies-transactions.service';
import { transaccionesInsumosTable } from '../../../../models/suppliesTransactions.model';

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
  habilitarExcel: boolean = false;

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
      const rpta: any = await this.suppliesTransactionService.buscarRegistros(this.dfecini, this.dfecfin).toPromise();
      this.transacciones = rpta;
      this.mostrarTabla = true;
      this.habilitarExcel = true;
      if (rpta.length == 0) {
        Swal.fire(
          'Informacion',
          'No se encontraron datos de esa fecha',
          'info'
        );
        this.mostrarTabla = false;
        this.habilitarExcel = false;
      }
    } catch (error) {
      Swal.fire(
        'Error',
        'Hubo un error ennla busqueda' + { error },
        'error'
      );
    }
  }

  async exportarExcel() {
    try {
      const response = await this.suppliesTransactionService.exportarRegistros(this.formatDate(new Date(this.dfecini)), this.formatDate(new Date(this.dfecfin))).toPromise();
      if (!response) {
        throw new Error('No se recibió el archivo para descargar.');
      }
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SuppliesTransactions-${new Date().toISOString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      Swal.fire('Error', 'No se pudo exportar los datos: ' + error, 'error');
    }
  }
}
