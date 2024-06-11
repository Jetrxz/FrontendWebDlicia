import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliesListComponent } from './supplies-list/supplies-list.component';
import { SuppliesMaintenanceComponent } from './supplies-maintenance/supplies-maintenance.component';

const routes: Routes = [
  {
    path: 'supplies-maintenance',
    component: SuppliesMaintenanceComponent
  },
  {
    path: 'supplies-list',
    component: SuppliesListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule { }
