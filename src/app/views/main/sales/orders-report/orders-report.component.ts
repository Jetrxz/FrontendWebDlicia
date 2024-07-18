import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ClientService } from '../../../../core/client.service';
import { ProductsService } from '../../../../core/products.service';
import { OrderService } from '../../../../core/order.service';

@Component({
  selector: 'app-orders-report',
  templateUrl: './orders-report.component.html',
  styleUrl: './orders-report.component.scss'
})
export class OrdersReportComponent implements OnInit {

  @ViewChild('addModal') addModal!: TemplateRef<any>;
  @ViewChild('searchModal') searchModal!: TemplateRef<any>;
  nombreCliente: string = '';
  clientes: any[] = [];
  selectedCliente: any;
  cnomcli:string = "";
  nidClient: number = 0;
  productos: any[] = [];
  selectedProduct: any = '0';
  productDescription: string = '';
  quantity: number = 0;
  order: any [] = [];
  

  constructor(private modalService: NgbModal, private clientService: ClientService, private productService: ProductsService,private orderService: OrderService) { }

  ngOnInit(): void {
    this.buscarClientes();
    this.listarProductos();
  }

  openAddModal() {
    this.order = [];
    this.quantity = 0;
    this.selectedCliente = "";
    this.cnomcli = "";
    this.nidClient = 0;
    this.modalService.open(this.addModal, { ariaLabelledBy: 'addModal' });
  }

  openSearchModal() {
    this.modalService.open(this.searchModal, { ariaLabelledBy: 'searchModal' });
  }

  async buscarClientes() {
    let cli: any = await this.clientService.listarClientes().toPromise();
    this.clientes = cli;
  }

  async listarProductos(){
    let pro: any = await this.productService.listarProductos().toPromise();
    this.productos = pro;
    this.productos = this.productos.map((producto: any) => {
      return {
        idProduct: producto.idProduct,
        productName: producto.productName,
        productDescription: producto.productDescription,
        price: producto.price
      };
    });
  }

  seleccionarCliente(cliente: any) {
    this.selectedCliente = cliente;
    this.cnomcli = this.selectedCliente.clientName;
    this.nidClient = this.selectedCliente.idClient;
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

  onProductChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const productId = selectElement.value;
    const selectedProduct = this.productos.find(producto => producto.idProduct == productId);
    if (selectedProduct) {
      this.productDescription = selectedProduct.productDescription;
    } else {
      this.productDescription = '';
    }
  }

  addProductToOrder() {
    if (this.selectedProduct !== '0' && this.quantity > 0) {
      const selectedProduct = this.productos.find(producto => producto.idProduct == this.selectedProduct);
      const subTotal = selectedProduct.price * this.quantity;
      this.order.push({
        productId: selectedProduct.idProduct,
        productName: selectedProduct.productName,
        quantity: this.quantity,
        subTotal: subTotal
      });
      this.selectedProduct = '0';
      this.productDescription = '';
      this.quantity = 0;
    } else {
      Swal.fire('Error!', 'Debe seleccionar un producto y una cantidad mayor a 0', 'error');
    }
  }

  removeProductFromOrder(index: number) {
    this.order.splice(index, 1);
  }

  async crearPedido(modal: any){
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
        const orden = {
          idClient: this.nidClient,
          total: this.order.reduce((acc, item) => acc + item.subTotal, 0),
          idState: 1,
          orderDeadline: new Date().toISOString()
        };
        console.log(orden)
        const createdOrder:any = await this.orderService.crearPedido(orden).toPromise();

        const orderDetails = this.order.map(item => ({
          idOrder: createdOrder.idOrder,
          idProduct: item.productId,
          quantity: item.quantity,
          subTotal: item.subTotal
        }));

        await this.orderService.crearDetallePedido(orderDetails).toPromise();
        Swal.fire(
          'Cambios guardados!',
          'El elemento ha sido creado.',
          'success'
        );
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
    this.order = [];
    this.quantity = 0;
    this.selectedCliente = "";
    this.cnomcli = "";
    this.nidClient = 0;
  }
}

