import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../../services/app-state.service';
import { AppStateViewModel, UserViewModel } from '../../../../models/app-state.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public appStateModel: AppStateViewModel;
  
  constructor(private appStateService: AppStateService) { };

  ngOnInit() {
    this.appStateService.AppStateViewModel.get.subscribe((response) => {
      this.appStateModel = response;
    });
  };
};
