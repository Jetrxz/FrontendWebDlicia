import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsMaintenanceComponent } from './products-maintenance/products-maintenance.component';
import { CategoriesMaintenanceComponent } from './categories-maintenance/categories-maintenance.component';

const routes: Routes = [
  {
    path: 'products-maintenance',
    component: ProductsMaintenanceComponent
  },
  {
    path: 'categories-maintenance',
    component: CategoriesMaintenanceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
