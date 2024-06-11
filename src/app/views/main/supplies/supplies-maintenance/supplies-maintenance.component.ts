import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2';
import { SuppliesTransactionsService } from '../../../../core/supplies-transactions.service';
import { InsumosTable } from '../../../../models/supplies.model';
import { tipoUnidadTable } from '../../../../models/unitOfMesure.model';
import { InsumosService } from '../../../../core/supplies.service';
@Component({
  selector: 'app-supplies-maintenance',
  templateUrl: './supplies-maintenance.component.html',
  styleUrl: './supplies-maintenance.component.scss'
})
export class SuppliesMaintenanceComponent implements OnInit {

  constructor( private insumosService:InsumosService, private modalService: NgbModal,private suppliesTransactionService: SuppliesTransactionsService){ }
  @ViewChild('createModal') createModal!: TemplateRef<any>;
  insumos:InsumosTable [] = [];
  unitOfMesureList: tipoUnidadTable[] = [];
  selectedSupplie: InsumosTable = new InsumosTable();
  isEditMode: boolean = false;
  originalSupplie: InsumosTable = new InsumosTable();

  ngOnInit(): void {
    this.listarInsumo();
    this.listarUnidades();
  }

  async listarInsumo(){
    let listaIsumos:any= await this.insumosService.listarInsumos().toPromise();
    this.insumos = listaIsumos;
  }

  async listarUnidades() {
    let unidades: any = await this.insumosService.listarUnidades().toPromise();
    this.unitOfMesureList = unidades;
  }

  openCreateModal() {
    this.selectedSupplie = new InsumosTable();
    this.isEditMode = false;
    this.modalService.open(this.createModal, { ariaLabelledBy: 'openCreateModal' });
  }

  openEditModal(supplie: InsumosTable) {
    this.selectedSupplie = { ...supplie }; 
    this.originalSupplie = { ...supplie }; 
    this.isEditMode = true;
    this.modalService.open(this.createModal, { ariaLabelledBy: 'openEditModal' });
  }

  formatDateToOnlyDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  async saveChanges(modal: any) {

    const dfecreg = this.formatDateToOnlyDate(new Date(this.selectedSupplie.lotDate));
    const supplie ={
      idSupplie: this.selectedSupplie.idSupplie,
      supplieName: this.selectedSupplie.supplieName,
      supplieDescription: this.selectedSupplie.supplieDescription, 
      quantity: this.selectedSupplie.quantity, 
      supplieLot: this.selectedSupplie.supplieLot,
      lotDate: dfecreg,
      unitOfMesureId: this.selectedSupplie.unitOfMesureId,
      unitOfMesure: this.selectedSupplie.unitOfMesure
      
    }

    let transaction: {
      idSupplie: number,
      quantity: number,
      transactionDate: Date,
      supplieBound: boolean
    };

    if (this.isEditMode) {
      const quantityDifference = this.selectedSupplie.quantity - this.originalSupplie.quantity;
      transaction = {
        idSupplie: this.selectedSupplie.idSupplie,
        quantity: Math.abs(quantityDifference),
        transactionDate: new Date(),
        supplieBound: quantityDifference > 0
      };
    } else {
      transaction = {
        idSupplie: this.selectedSupplie.idSupplie,
        quantity: this.selectedSupplie.quantity,  
        transactionDate: new Date(),
        supplieBound: true
      };
    }

    const result = await Swal.fire({
      title: 'Cuidado',
      text: '¿Está seguro de guardar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });
    
    if (result.isConfirmed) {
      try {
        if (this.isEditMode) {
          await this.insumosService.actualizarInsumo(supplie).toPromise();
          console.log(transaction)
          await this.suppliesTransactionService.registrarTransaccion(transaction).toPromise();
          this.listarInsumo();
          Swal.fire(
            'Cambios guardados!',
            'El elemento ha sido actualizado.',
            'success'
          );
        } else {
          const createdSupplie = await this.insumosService.crearInsumo(supplie).toPromise();
         if (createdSupplie && createdSupplie.idSupplie) {
            transaction.idSupplie = createdSupplie.idSupplie;
            await this.suppliesTransactionService.registrarTransaccion(transaction).toPromise();
            this.listarInsumo();
            Swal.fire(
              'Cambios guardados!',
              'El elemento ha sido creado.',
              'success'
            );
          } else {
            throw new Error('Error al obtener el ID del nuevo insumo');
          }
        }
      } catch (error) {
        Swal.fire(
          'Error',
          'Hubo un error al guardar los cambios.',
          'error'
        );
      }
    } else {
      Swal.fire(
        'Cancelado',
        'La acción ha sido cancelada',
        'info'
      );
    }
  
    modal.close();
  }

  onKeyDown(event: any) {
    // Obtener el código de la tecla presionada
    const keyCode = event.keyCode || event.which;
  
    // Permitir solo teclas numéricas y la tecla de retroceso
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
      event.preventDefault(); // Prevenir la acción por defecto si no es una tecla numérica o de retroceso
      Swal.fire(
        'Cuidado!',
        'Solo puede ingresar numeros',
        'info'
      );
    }
  
    // Prevenir la entrada del signo de menos (-)
    if (keyCode === 189 || keyCode === 109) {
      event.preventDefault(); // Prevenir la acción por defecto si se presiona el signo de menos
      Swal.fire(
        'Cuidado!',
        'No puede ingresar numeros negativos',
        'info'
      );
    }
  }
}
