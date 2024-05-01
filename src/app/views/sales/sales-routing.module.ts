import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { ClientsReportComponent } from './clients-report/clients-report.component';
import { OrdersReportComponent } from './orders-report/orders-report.component';

const routes: Routes = [
  {
    path:'sale-report',
    component: SalesReportComponent
  },
  {
    path:'clients-report',
    component: ClientsReportComponent
  },
  {
    path:'orders-report',
    component: OrdersReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
