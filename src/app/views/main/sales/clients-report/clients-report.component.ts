import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClientTable } from '../../../../models/client.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../../core/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients-report',
  templateUrl: './clients-report.component.html',
  styleUrl: './clients-report.component.scss'
})
export class ClientsReportComponent implements OnInit{
  

  constructor( private clienteService:ClientService, private modalService: NgbModal){ }

  clients:ClientTable [] = [];
  selectedClient: ClientTable = { idClient: 0, clientName: '', cardId: '', phone: '', email: '', adress: '' };
  isEditMode: boolean = false;
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  @ViewChild('envcor') envioCorreoModal!: TemplateRef<any>;
  mensajeCorreo:string = "";
  imagenCorreo: File | null = null;
  
  ngOnInit(): void {
    this.listarClientes();
  }

  async listarClientes(){
    let listaClientes:any= await this.clienteService.listarClientes().toPromise();
    this.clients = listaClientes;
  }

  openCreateModal() {
    this.selectedClient = new ClientTable();
    this.isEditMode = false;
    this.modalService.open(this.editModal, { ariaLabelledBy: 'openCreateModal' });
  }

  openEditModal(client: ClientTable) {
    this.selectedClient = { ...client };
    this.isEditMode = true;
    this.modalService.open(this.editModal, { ariaLabelledBy: 'editModalLabel' });
  }

  openEnvioCorreoModal(client: ClientTable){
    this.mensajeCorreo = "";
    this.selectedClient = { ...client };
    this.modalService.open(this.envioCorreoModal, { ariaLabelledBy: 'envioCorreoModal' });
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
        const cliente ={
          idClient: this.selectedClient.idClient,
          clientName: this.selectedClient.clientName, 
          cardId: this.selectedClient.cardId, 
          phone: this.selectedClient.phone,
          email: this.selectedClient.email,
          adress: this.selectedClient.adress
        }
        if (this.isEditMode) {
          await this.clienteService.actualizarCliente(cliente).toPromise();
          this.listarClientes();
          Swal.fire(
            'Cambios guardados!',
            'El elemento ha sido actualizado.',
            'success'
          );
        } else {
          await this.clienteService.crearCliente(cliente).toPromise();
          this.listarClientes();
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

  EnviarCorreo(modal:any){
    const formData = new FormData();
    formData.append('email', this.selectedClient.email);
    formData.append('mensaje', this.mensajeCorreo);
    if (this.imagenCorreo) {
      formData.append('imagen', this.imagenCorreo);
    }

    this.clienteService.enviarCorreo(formData).subscribe(
      response => {
        Swal.fire('Correo Enviado', 'El correo ha sido enviado con éxito.', 'success');
        modal.close();
      },
      error => {
        Swal.fire('Error', 'Hubo un error al enviar el correo.', 'error');
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imagenCorreo = event.target.files[0];
    }
  }
}
