import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { AppStateModel } from '../../models/app-state.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public appStateModel: AppStateModel;

  constructor(private homeService: HomeService) { };

  ngOnInit() {
    this.homeService.AppStateModel.subscribe((response) => {
      this.appStateModel = response;
      console.debug("home readed...", response);
    });
  };
};
