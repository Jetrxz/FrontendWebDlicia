import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductTypeService } from '../../../core/product-type.service';
import { tipoProductoTable } from '../../../models/productType.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-maintenance',
  templateUrl: './categories-maintenance.component.html',
  styleUrl: './categories-maintenance.component.scss'
})
export class CategoriesMaintenanceComponent implements OnInit{

  constructor( private productTypeService:ProductTypeService, private modalService: NgbModal){ }

  tipoProductos:tipoProductoTable [] = [];
  selectedProductType: tipoProductoTable = { idProductType: 0, productType: '', description: '', state: '' };
  selectStateProduct:string = 'Activo';
  isEditMode: boolean = false;
  @ViewChild('editModal') editModal!: TemplateRef<any>;

  ngOnInit(): void {
    this.listarTipoProducto();
  }

  async listarTipoProducto() {
    let listarTipoProductos: any = await this.productTypeService.listarTipoProductos(this.selectStateProduct).toPromise();
    this.tipoProductos = listarTipoProductos;
  }

  async onStateChange(event: any) {
    this.selectStateProduct = event.target.value;
    await this.listarTipoProducto();
  }

  openCreateModal() {
    this.selectedProductType = new tipoProductoTable();
    this.isEditMode = false;
    this.modalService.open(this.editModal, { ariaLabelledBy: 'openCreateModal' });
  }

  openEditModal(productType: tipoProductoTable) {
    this.selectedProductType = { ...productType };
    this.isEditMode = true;
    this.modalService.open(this.editModal, { ariaLabelledBy: 'editModalLabel' });
  }

  async saveChanges(modal: any) {
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
        const tipoProducto ={
          idProductType: this.selectedProductType.idProductType,
          productType: this.selectedProductType.productType, 
          description: this.selectedProductType.description, 
          state: this.selectedProductType.state
        }
        if (this.isEditMode) {
          await this.productTypeService.actualizarTipoProductos(tipoProducto).toPromise();
          this.listarTipoProducto();
          Swal.fire(
            'Cambios guardados!',
            'El elemento ha sido actualizado.',
            'success'
          );
        } else {
          await this.productTypeService.crearTipoProductos(tipoProducto).toPromise();
          this.listarTipoProducto();
          Swal.fire(
            'Cambios guardados!',
            'El elemento ha sido creado.',
            'success'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error',
          'Hubo un error al actualizar los cambios.',
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

  async deactivateProduct(productType: tipoProductoTable) {
    const result = await Swal.fire({
      title: 'Cuidado',
      text: '¿Está seguro de desactivar esta categoria?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });

    if (result.isConfirmed) {
      try {
        productType.state = 'Inactivo';
        await this.productTypeService.actualizarTipoProductos(productType).toPromise();
        this.listarTipoProducto();
        Swal.fire(
          'Producto Desactivado!',
          'El producto ha sido desactivado.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error',
          'Hubo un error al desactivar el producto.',
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
  }
}
