import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes, routedComponents } from './dashboard.routing';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes,
    SharedModule
  ],
  declarations: [routedComponents]
})
export class DashboardModule { };
