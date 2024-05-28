import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { tipoUsuariosTable } from '../../../models/usersType.model';
import { EmployeeTypeService } from '../../../core/employee-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees-profile-maintenance',
  templateUrl: './employees-profile-maintenance.component.html',
  styleUrl: './employees-profile-maintenance.component.scss'
})
export class EmployeesProfileMaintenanceComponent implements OnInit {

  constructor(private employeeTypeService:EmployeeTypeService, private modalService: NgbModal){ }
  @ViewChild('createModal') createModal!: TemplateRef<any>;
  perfiles: tipoUsuariosTable[] = [];
  selectedEmployeeType: tipoUsuariosTable = new tipoUsuariosTable();
  isEditMode: boolean = false;
  selectedStateEmmplooyeeType:string = 'Activo'

  ngOnInit(): void {
    this.listarPerfiles();
  }

  async listarPerfiles(){
    let listarPerfiles:any= await this.employeeTypeService.listarPerfiles(this.selectedStateEmmplooyeeType).toPromise();
    this.perfiles = listarPerfiles; 
  }

  async onStateChange(event: any) {
    this.selectedStateEmmplooyeeType = event.target.value;
    await this.listarPerfiles();
  }

  openCreateModal() {
    this.selectedEmployeeType = new tipoUsuariosTable();
    this.isEditMode = false;
    this.modalService.open(this.createModal, { ariaLabelledBy: 'openCreateModal' });
  }

  openEditModal(employeeType: tipoUsuariosTable) {
    this.selectedEmployeeType = { ...employeeType }; 
    this.isEditMode = true;
    this.modalService.open(this.createModal, { ariaLabelledBy: 'openEditModal' });
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
          await this.employeeTypeService.actualizarPerfil(this.selectedEmployeeType).toPromise();
          this.listarPerfiles();
          Swal.fire(
            'Cambios guardados!',
            'El elemento ha sido actualizado.',
            'success'
          );
        } else {
          await this.employeeTypeService.crearPerfil(this.selectedEmployeeType).toPromise();
          this.listarPerfiles();
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

  async deactivateProfile(employeeType: tipoUsuariosTable) {
    const result = await Swal.fire({
      title: 'Cuidado',
      text: '¿Está seguro de desactivar este perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });

    if (result.isConfirmed) {
      try {
        employeeType.state = 'Inactivo';
        await this.employeeTypeService.actualizarPerfil(employeeType).toPromise();
        this.listarPerfiles();
        Swal.fire(
          'Producto Desactivado!',
          'El perfil ha sido desactivado.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error',
          'Hubo un error al desactivar el perfil.',
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
