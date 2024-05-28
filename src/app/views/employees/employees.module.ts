import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesAssignComponent } from './employees-assign/employees-assign.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { FormsModule } from '@angular/forms';
import { EmployeesProfileMaintenanceComponent } from './employees-profile-maintenance/employees-profile-maintenance.component';


@NgModule({
  declarations: [
    EmployeesAssignComponent,
    EmployeesListComponent,
    EmployeesProfileMaintenanceComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule
  ]
})
export class EmployeesModule { }
