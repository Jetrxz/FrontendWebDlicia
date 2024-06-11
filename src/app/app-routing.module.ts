import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  // {path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  {
    path:'main',
    loadChildren:() => import("./views/main/main.module").then(x=>x.MainModule), canActivate: [AuthGuard]
  },
  // {
  //   path: 'products', 
  //   loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'supplies', 
  //   loadChildren: () => import('./views/supplies/supplies.module').then(m => m.SuppliesModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'sales',
  //   loadChildren: () => import('./views/sales/sales.module').then(m => m.SalesModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'employees',
  //   loadChildren: () => import('./views/employees/employees.module').then(m => m.EmployeesModule),
  //   canActivate: [AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
