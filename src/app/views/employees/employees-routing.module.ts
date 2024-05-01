import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesAssignComponent } from './employees-assign/employees-assign.component';

const routes: Routes = [
  {
    path:'employees-assign',
    component: EmployeesAssignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
