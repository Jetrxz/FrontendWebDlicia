import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { ClientsReportComponent } from './clients-report/clients-report.component';
import { OrdersReportComponent } from './orders-report/orders-report.component';


@NgModule({
  declarations: [
    SalesReportComponent,
    ClientsReportComponent,
    OrdersReportComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
