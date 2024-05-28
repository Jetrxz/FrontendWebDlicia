import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { InsumosService } from '../../../core/supplies.service';
import { InsumosTable } from '../../../models/supplies.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tipoUnidadTable } from '../../../models/unitOfMesure.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplies-maintenance',
  templateUrl: './supplies-maintenance.component.html',
  styleUrl: './supplies-maintenance.component.scss'
})
export class SuppliesMaintenanceComponent implements OnInit {

  constructor( private insumosService:InsumosService, private modalService: NgbModal){ }
  @ViewChild('createModal') createModal!: TemplateRef<any>;
  insumos:InsumosTable [] = [];
  unitOfMesureList: tipoUnidadTable[] = [];
  selectedSupplie: InsumosTable = new InsumosTable();
  isEditMode: boolean = false;

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
    this.isEditMode = true;
    this.modalService.open(this.createModal, { ariaLabelledBy: 'openEditModal' });
  }

  formatDateToOnlyDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero
    const day = ('0' + date.getDate()).slice(-2); // Adding leading zero
    return `${year}-${month}-${day}`;
  }

  async saveChanges(modal: any) {
    const dfecreg = this.formatDateToOnlyDate(new Date(this.selectedSupplie.lotDate));
    const supplie ={
      supplieName: this.selectedSupplie.supplieName,
      supplieDescription: this.selectedSupplie.supplieDescription, 
      quantity: this.selectedSupplie.quantity, 
      supplieLot: this.selectedSupplie.supplieLot,
      lotDate: dfecreg,
      unitOfMesureId: this.selectedSupplie.unitOfMesureId
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
          this.listarInsumo();
          Swal.fire(
            'Cambios guardados!',
            'El elemento ha sido actualizado.',
            'success'
          );
        } else {
          await this.insumosService.crearInsumo(supplie).toPromise();
          this.listarInsumo();
          Swal.fire(
            'Cambios guardados!',
            'El elemento ha sido creado.',
            'success'
          );
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
}
