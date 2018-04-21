import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule, routedComponents } from './home.routing';
import { SharedModule } from '../../shared/shared.module';
import { HomeService } from '../../services/home.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers:[HomeService],
  declarations: [ routedComponents]
})
export class HomeModule { };
