import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxElectronModule } from 'ngx-electron';
import { AuthGuard } from '../guards/auth.guard';
import { AjaxService } from '../services/ajax.service';
import { AuthService } from '../services/auth.service';
import { InternElectronService } from '../providers/internElectron.service';
// import { AppStateService } from '../services/app-state.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { AppStoreService } from '../services/app-store.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxElectronModule,
    NgbModule.forRoot(),
    NgCircleProgressModule.forRoot(),
    RoundProgressModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgCircleProgressModule,
    RoundProgressModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AppStoreService,
        AuthGuard,
        // AppStateService,
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