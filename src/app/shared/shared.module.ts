import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxElectronModule } from 'ngx-electron';
import { AuthGuard } from '../guards/auth.guard';
import { AjaxService } from '../services/ajax.service';
import { InternElectronService } from '../providers/internElectron.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxElectronModule,
    NgbModule.forRoot()
  ],
  exports: [
    CommonModule,
    NgbModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuard,
        InternElectronService,
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        AjaxService
      ]
    };
  };
};

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
};