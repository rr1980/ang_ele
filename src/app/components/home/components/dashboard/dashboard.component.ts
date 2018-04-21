import { Component, OnInit } from '@angular/core';
import { HomeModel } from 'src/app/components/home/models/home.model';
import { HomeService } from '../../../../services/home.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public homeData: HomeModel; 

  constructor(private homeService: HomeService) { };

  ngOnInit() {

    this.homeService.Model.subscribe((response) => {
      this.homeData = response;
      console.debug("dash readed...", response);
    });
  };
};
