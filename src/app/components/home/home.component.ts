import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { AppStateModel } from '../../models/app-state.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public appStateModel: AppStateModel;

  constructor(private appStateService: AppStateService) { };

  ngOnInit() {
    this.appStateService.AppStateModel.subscribe((response) => {
      this.appStateModel = response;
      console.debug("home readed...", response);
    });
  };
};
