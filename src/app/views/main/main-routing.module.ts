import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component:MainComponent,
    children:[
      {path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard]}, 

      {
        path: 'products', 
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'supplies', 
        loadChildren: () => import('./supplies/supplies.module').then(m => m.SuppliesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
        canActivate: [AuthGuard]
      },
    ],
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
