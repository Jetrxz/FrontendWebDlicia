import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesAssignComponent } from './employees-assign/employees-assign.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesProfileMaintenanceComponent } from './employees-profile-maintenance/employees-profile-maintenance.component';

const routes: Routes = [
  {
    path:'employees-assign',
    component: EmployeesAssignComponent
  },
  {
    path:'employees-list',
    component: EmployeesListComponent
  },
  {
    path:'employees-profile',
    component: EmployeesProfileMaintenanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
