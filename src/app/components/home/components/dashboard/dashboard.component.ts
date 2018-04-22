import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStateService } from '../../../../services/app-state.service';
import { AppStateViewModel, CpuViewModel } from '../../../../models/app-state.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {


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
  
  public appStateModel: AppStateViewModel;
  // public cpuModel: CpuViewModel;

  constructor(private appStateService: AppStateService) { };

  ngOnInit() {
    this.appStateService.AppStateViewModel.get.subscribe((response) => {
      this.appStateModel = response;
    });

    this.appStateService.AppStateViewModel.setCpuFeedOn();
  };

  ngOnDestroy(): void {
    this.appStateService.AppStateViewModel.setCpuFeedOff();
  }

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
