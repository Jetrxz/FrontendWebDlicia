import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './views/login/login.component';


const routes: Routes = [
  {path: '', redirectTo:'dashboard', pathMatch:'full'},
  {path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  {
    path: 'products', 
    loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'supplies', 
    loadChildren: () => import('./views/supplies/supplies.module').then(m => m.SuppliesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sales',
    loadChildren: () => import('./views/sales/sales.module').then(m => m.SalesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    loadChildren: () => import('./views/employees/employees.module').then(m => m.EmployeesModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
