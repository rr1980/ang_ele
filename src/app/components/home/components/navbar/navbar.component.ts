import { Component, OnInit } from '@angular/core';
import { HomeModel } from '../../models/home.model';
import { HomeService } from '../../../../services/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public homeData: HomeModel;

  constructor(private homeService: HomeService) { };

  ngOnInit() {
    this.homeService.Model.subscribe((response) => {
      this.homeData = response;
      console.debug("navbar readed...", response);
    });
  };
};
