import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../../services/app-state.service';
import { AppStateModel } from '../../../../models/app-state.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public appStateModel: AppStateModel;

  constructor(private appStateService: AppStateService) { };

  ngOnInit() {
    this.appStateService.AppStateModel.subscribe((response) => {
      this.appStateModel = response;
      console.debug("navbar readed...", response);
    });
  };
};
