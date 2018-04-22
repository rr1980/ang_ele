import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../services/home.service';
import { AppStateModel } from '../../../../models/app-state.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public appStateModel: AppStateModel;

  constructor(private homeService: HomeService) { };

  ngOnInit() {
    this.homeService.AppStateModel.subscribe((response) => {
      this.appStateModel = response;
      console.debug("navbar readed...", response);
    });
  };
};
