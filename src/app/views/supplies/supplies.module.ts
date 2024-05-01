import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesRoutingModule } from './supplies-routing.module';
import { SuppliesMaintenanceComponent } from './supplies-maintenance/supplies-maintenance.component';
import { SuppliesListComponent } from './supplies-list/supplies-list.component';


@NgModule({
  declarations: [
    SuppliesMaintenanceComponent,
    SuppliesListComponent
  ],
  imports: [
    CommonModule,
    SuppliesRoutingModule
  ]
})
export class SuppliesModule { }
