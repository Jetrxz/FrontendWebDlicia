import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesRoutingModule } from './supplies-routing.module';
import { SuppliesMaintenanceComponent } from './supplies-maintenance/supplies-maintenance.component';
import { SuppliesListComponent } from './supplies-list/supplies-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SuppliesMaintenanceComponent,
    SuppliesListComponent
  ],
  imports: [
    CommonModule,
    SuppliesRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class SuppliesModule { }
