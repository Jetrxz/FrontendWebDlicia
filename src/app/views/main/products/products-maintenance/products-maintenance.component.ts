import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { InsumosService } from '../../../../core/supplies.service';
import { ProductTypeService } from '../../../../core/product-type.service';
import { ProductosTable } from '../../../../models/products.model';
import { tipoProductoTable } from '../../../../models/productType.model';
import { tipoUnidadTable } from '../../../../models/unitOfMesure.model';
import { ProductsService } from '../../../../core/products.service';

@Component({
  selector: 'app-products-maintenance',
  templateUrl: './products-maintenance.component.html',
  styleUrl: './products-maintenance.component.scss'
})
export class ProductsMaintenanceComponent  implements OnInit{
  constructor( private productosService:ProductsService, private modalService: NgbModal, private insumosService: InsumosService, private productTypeService:ProductTypeService){ }
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  @ViewChild('updateModal') updateModal!: TemplateRef<any>;
  productos: ProductosTable [] = [];
  urlBackend: string = "https://localhost:7044";
  isEditMode: boolean = false;
  selectedProduct: ProductosTable = new ProductosTable();
  unitOfMesureList: tipoUnidadTable[] = [];
  tipoProductos:tipoProductoTable [] = [];
  selectedFile!: File;

  ngOnInit(): void {
    this.listarProducto();
    this.listarUnidades();
    this.listarTipoProducto();
  }

  async listarProducto(){
    let listarProductos:any= await this.productosService.listarProductos().toPromise();
    this.productos = listarProductos; 
  }

  async listarUnidades() {
    let unidades: any = await this.insumosService.listarUnidades().toPromise();
    this.unitOfMesureList = unidades;
  }

  async listarTipoProducto() {
    const state = 'Activo';
    let listarTipoProductos: any = await this.productTypeService.listarTipoProductos(state).toPromise();
    this.tipoProductos = listarTipoProductos;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  openEditModal(product: ProductosTable) {
    this.selectedProduct = { ...product }; 
    this.isEditMode = true;
    this.modalService.open(this.editModal, { ariaLabelledBy: 'editModalLabel' });
  }

  openCreateModal() {
    this.selectedProduct = new ProductosTable();
    this.isEditMode = false;
    this.modalService.open(this.editModal, { ariaLabelledBy: 'openCreateModal' });
  }

  openUpdateModal(product: ProductosTable){
    this.selectedProduct = { ...product }; 
    this.modalService.open(this.updateModal, { ariaLabelledBy: 'openUpdateModal' });
  }

  async updateImage(modal: any) {
    if (this.selectedFile) {
      try {
        await this.productosService.actualizarImagen(this.selectedProduct.idProduct, this.selectedFile).toPromise();
        this.listarProducto();
        Swal.fire(
          'Imagen actualizada!',
          'La imagen del producto ha sido actualizada.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error',
          'Hubo un error al actualizar la imagen.',
          'error'
        );
      }
    } else {
      Swal.fire(
        'Error',
        'Por favor seleccione una imagen.',
        'error'
      );
    }
    modal.close();
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
        if (this.isEditMode) {
          await this.productosService.actualizarProducto(this.selectedProduct).toPromise();
          this.listarProducto();
          Swal.fire(
            'Cambios guardados!',
            'El elemento ha sido actualizado.',
            'success'
          );
        } else {
          const producto ={
            productName: this.selectedProduct.productName, 
            productDescription: this.selectedProduct.productDescription, 
            price: this.selectedProduct.price,
            idProductType: Number(this.selectedProduct.productTypeId),
            idUnitOfMesure: Number(this.selectedProduct.unitOfMesureId)
          }
          await this.productosService.crearProducto(producto).toPromise();
          this.listarProducto();
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

  onKeyDown(event: any) {
    // Obtener el código de la tecla presionada
    const keyCode = event.keyCode || event.which;
  
    // Permitir solo teclas numéricas, la tecla de retroceso, el punto decimal y evitar otros caracteres
    if (
      (keyCode < 48 || keyCode > 57) &&  // Teclas numéricas
      keyCode !== 8 &&                    // Tecla de retroceso
      keyCode !== 46 &&                   // Punto decimal
      keyCode !== 37 &&                   // Flecha izquierda
      keyCode !== 39 &&                     // Flecha derecha
      keyCode !== 190           // Flecha derecha
    ) {
      event.preventDefault(); // Prevenir la acción por defecto si no es una tecla permitida
      Swal.fire(
        'Cuidado!',
        'Solo puede ingresar números',
        'info'
      );
    }
  
    // Prevenir la entrada del signo de menos (-)
    if (keyCode === 189 || keyCode === 109) {
      event.preventDefault(); // Prevenir la acción por defecto si se presiona el signo de menos
      Swal.fire(
        'Cuidado!',
        'No puede ingresar números negativos',
        'info'
      );
    }
  }
  
  
}
