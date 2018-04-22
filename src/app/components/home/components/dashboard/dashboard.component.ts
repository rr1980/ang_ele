import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../../services/app-state.service';
import { AppStateModel, CpuModel } from '../../../../models/app-state.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  current: number = 27;
  max: number = 50;
  stroke: number = 15;
  radius: number = 125;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#45ccce';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;
  
  public appStateModel: AppStateModel;
  public cpuModel: CpuModel;

  constructor(private appStateService: AppStateService) { };

  ngOnInit() {

    this.appStateService.AppStateModel.subscribe((response) => {
      this.appStateModel = response;
      console.debug("dash readed...", response);
    });

    this.appStateService.CpuModel.subscribe((response) => {
      if (this.cpuModel) {
        this.cpuModel.cpus[0].use = response.cpus[0].use
      }
      else {
        this.cpuModel = response;
      }


      console.debug("cpu readed...", response);
    });
  };

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }
};
