import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../services/home.service';
import { AppStateModel } from '../../../../models/app-state.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public appStateModel: AppStateModel; 

  constructor(private homeService: HomeService) { };

  ngOnInit() {

    this.homeService.AppStateModel.subscribe((response) => {
      this.appStateModel = response;
      console.debug("dash readed...", response);
    });
  };
};
