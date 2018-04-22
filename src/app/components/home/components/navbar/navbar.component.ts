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
  
  public userViewModel: UserViewModel;

  constructor(private appStateService: AppStateService) { };

  ngOnInit() {
    this.appStateService.AppStateViewModel.subscribe((response) => {
      this.appStateModel = response;
      console.debug("navbar readed...", response);
    });

    this.appStateService.UserViewModel.subscribe((response) => {
      this.userViewModel = response;
      console.debug("navbar userer readed...", response);
    });
  };
};
