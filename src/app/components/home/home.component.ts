import { Component, OnInit } from '@angular/core';
import { HomeModel } from 'src/app/components/home/models/home.model';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public homeData: HomeModel;

  constructor(private homeService: HomeService) { };

  ngOnInit() {
    this.homeService.Model.subscribe((response) => {
      this.homeData = response;
      console.debug("home readed...", response);
    });
  };
};
