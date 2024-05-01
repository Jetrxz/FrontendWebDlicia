import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsMaintenanceComponent } from './products-maintenance/products-maintenance.component';
import { CategoriesMaintenanceComponent } from './categories-maintenance/categories-maintenance.component';


@NgModule({
  declarations: [
    ProductsMaintenanceComponent,
    CategoriesMaintenanceComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
