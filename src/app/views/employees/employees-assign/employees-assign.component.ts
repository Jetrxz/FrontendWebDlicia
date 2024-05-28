import { Component, OnInit } from '@angular/core';
import { tipoUsuariosTable } from '../../../models/usersType.model';
import { EmployeeTypeService } from '../../../core/employee-type.service';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../../core/employee.service';

@Component({
  selector: 'app-employees-assign',
  templateUrl: './employees-assign.component.html',
  styleUrl: './employees-assign.component.scss'
})
export class EmployeesAssignComponent implements OnInit{
  constructor(private employeeTypeService:EmployeeTypeService, private employeeService:EmployeeService){}

  nombre:string = '';
  email:string = '';
  correo:string = '';
  clave:string = '';
  perfil:string = '';
  tipoUsuarios:tipoUsuariosTable [] = [];
  selectedStateEmmplooyeeType:string = 'Activo'

  ngOnInit(): void {
    this.obtenerPerfiles();
  }

  async crearEmpleado(){
    const campos = [this.nombre, this.correo, this.clave];
    const hayCamposVacios = campos.some(campo => campo === '');
    if(hayCamposVacios){
      Swal.fire({
        title: 'Alerta',
        text: 'Debe rellenar todos los campos',
        icon: 'warning'
      });
      return;
    }
    if(this.perfil == ''){
      Swal.fire({
        title: 'Alerta',
        text: 'Debe seleccionar un perfil antes de crearlo',
        icon: 'warning'
      });
      return;
    }
    const perfilSeleccionado = this.tipoUsuarios.find(tipoUsuario => tipoUsuario.name === this.perfil);
    const idUserType = perfilSeleccionado ? perfilSeleccionado.idUserType : 0;
    const empleado ={
      name: this.nombre,
      email: this.correo,
      pasword: this.clave,
      state: true,
      idUserType: idUserType
    }
    try {
      await this.employeeService.crearEmpleado(empleado).toPromise();
      Swal.fire({
        title: 'Éxito',
        text: 'Empleado creado correctamente',
        icon: 'success'
      });
      this.nombre = '';
      this.correo = '';
      this.email = '';
      this.clave = '';
      this.perfil = '';
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear el empleado',
        icon: 'error'
      });
      console.error('Error al crear el empleado:', error);
    }
  }

  async obtenerPerfiles(){
    let obtenerPerfiles:any= await this.employeeTypeService.listarPerfiles(this.selectedStateEmmplooyeeType).toPromise();
    this.tipoUsuarios = obtenerPerfiles; 
  }
}
