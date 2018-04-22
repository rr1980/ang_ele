import { Component, OnInit, OnDestroy } from '@angular/core';
import { CpuViewModel } from '../../../../../../models/app-state.model';
import { AppStoreService } from '../../../../../../services/app-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cpuMonitor-widget',
  templateUrl: './cpuMonitor-widget.component.html',
  styleUrls: ['./cpuMonitor-widget.component.scss']
})
export class CpuMonitorWidgetComponent implements OnInit, OnDestroy {
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

  public cpuViewModel: CpuViewModel;
  sub_Id: number;

  sub:Subscription;

  constructor(private appStoreService: AppStoreService) { };
  ngOnInit() {
    this.sub = this.appStoreService.get('setCpus').subscribe((response) => {
      this.cpuViewModel = response as CpuViewModel;
    });
    this.appStoreService.send("setCpuFeedOn");
  };

  ngOnDestroy(): void {
    this.appStoreService.send("setCpuFeedOff");
    this.sub.unsubscribe();
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
}
