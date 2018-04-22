import { Component, AfterViewInit } from '@angular/core';
import { InternElectronService } from './providers/internElectron.service';
import { AppConfig } from './app.config';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(public internElectronService: InternElectronService, private appStateService: AppStateService) {

    console.log('AppConfig', AppConfig);

    if (internElectronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', internElectronService.ipcRenderer);
      console.log('NodeJS childProcess', internElectronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngAfterViewInit(): void {
    this.appStateService.init();
  }
}
