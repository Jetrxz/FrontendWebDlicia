import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsuariosTable } from '../../../models/users.model';
import { EmployeeService } from '../../../core/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EmployeeTypeService } from '../../../core/employee-type.service';
import { tipoUsuariosTable } from '../../../models/usersType.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent implements OnInit{

  constructor( private usuariosService:EmployeeService, private modalService: NgbModal, private employeeTypeService:EmployeeTypeService){ }

  usuarios:UsuariosTable [] = [];
  selectedUser: UsuariosTable = new UsuariosTable();
  selectStateEmployee:boolean = true;
  perfiles:tipoUsuariosTable [] = [];
  editedUserState: boolean = true;
  selectedStateEmmplooyeeType:string = 'Activo';
  originaUser: UsuariosTable | null = null;

  @ViewChild('editModal') editModal!: TemplateRef<any>;

  ngOnInit(): void {
    this.listarEmpleados();
    this.listarPerfiles();
  }

  async listarEmpleados(){
    let listaEmpleados:any= await this.usuariosService.listarEmpleados(this.selectStateEmployee).toPromise();
    this.usuarios = listaEmpleados; 
  }

  async listarPerfiles(){
    let listarPerfiles:any= await this.employeeTypeService.listarPerfiles(this.selectedStateEmmplooyeeType).toPromise();
    this.perfiles = listarPerfiles; 
  }

  async onStateChange(event: any) {
    this.selectStateEmployee = event.target.value;
    await this.listarEmpleados();
  }

  areEqual(obj1: UsuariosTable, obj2: UsuariosTable): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  openEditModal(user: UsuariosTable) {
    this.selectedUser = { ...user }; 
    this.originaUser = { ...user }; 
    this.editedUserState = user.state;
    this.modalService.open(this.editModal, { ariaLabelledBy: 'editModalLabel' });
  }

  async saveChanges(modal: any) {
    if (this.originaUser && this.areEqual(this.selectedUser, this.originaUser)) {
      Swal.fire('No se detectaron cambios', 'No se ha modificado nada.', 'info');
      modal.close();
      return;
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
        
        if (this.editedUserState !== this.selectedUser.state) {
          this.selectedUser.state = this.editedUserState;
        }
        await this.usuariosService.actualizarEmpleados(this.selectedUser).toPromise();
        this.listarEmpleados();
        Swal.fire(
          'Cambios Actualizados!',
          'El elemento ha sido actualizado.',
          'success'
        );
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

  async deactivateProduct(user: UsuariosTable) {
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
        user.state = false;
        await this.usuariosService.actualizarEmpleados(user).toPromise();
        this.listarEmpleados();
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
