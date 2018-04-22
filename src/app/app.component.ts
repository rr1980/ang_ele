import { Component, AfterViewInit } from '@angular/core';
import { InternElectronService } from './providers/internElectron.service';
import { AppConfig } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(public internElectronService: InternElectronService) {

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
    // this.appStateService.init();
  }
}
