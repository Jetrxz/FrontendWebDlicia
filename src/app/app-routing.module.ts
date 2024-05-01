import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', redirectTo:'dashboard', pathMatch:'full'},
  {path: 'dashboard', component:DashboardComponent},
  {
    path: 'products', 
    loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'supplies', 
    loadChildren: () => import('./views/supplies/supplies.module').then(m => m.SuppliesModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./views/sales/sales.module').then(m => m.SalesModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./views/employees/employees.module').then(m => m.EmployeesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
