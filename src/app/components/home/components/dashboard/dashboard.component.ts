import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../../services/app-state.service';
import { AppStateModel } from '../../../../models/app-state.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public appStateModel: AppStateModel; 

  constructor(private appStateService: AppStateService) { };

  ngOnInit() {

    this.appStateService.AppStateModel.subscribe((response) => {
      this.appStateModel = response;
      console.debug("dash readed...", response);
    });
  };
};
