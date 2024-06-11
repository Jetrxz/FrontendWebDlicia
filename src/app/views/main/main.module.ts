import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    SublevelMenuComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
