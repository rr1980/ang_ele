import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { AppStateViewModel } from '../../models/app-state.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public appStateModel: AppStateViewModel;

  constructor(private appStateService: AppStateService) { };

  ngOnInit() {
    this.appStateService.AppStateViewModel.get.subscribe((response) => {
      this.appStateModel = response;
    });
  };
};
