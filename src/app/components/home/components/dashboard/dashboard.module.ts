import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes, routedComponents } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes
  ],
  declarations: [routedComponents]
})
export class DashboardModule { };
