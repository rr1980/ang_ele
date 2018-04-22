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

  private sub_Id: number;
  private sub: Subscription;
  private _init=false;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: false,
    maintainAspectRatio: false
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'horizontalBar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'CPU' }
  ];

  public cpuViewModel: CpuViewModel;

  constructor(private appStoreService: AppStoreService) { };
  ngOnInit() {
    this.sub = this.appStoreService.get('setCpus').subscribe((response) => {

      if (response) {
        var _data = [];
        for (let index = 0; index < (response as CpuViewModel).cpus.length; index++) {
          const element = (response as CpuViewModel).cpus[index];

          if (!this._init) {
            this.barChartLabels.push('Cpu' + index.toString());
          }
          _data.push(element.use);
        }

        this._init=true;

        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = _data;
        this.barChartData = clone;

        this.cpuViewModel = response as CpuViewModel;
      }
    });

    this.appStoreService.send("setCpuFeedOn");
  };

  ngOnDestroy(): void {
    this.appStoreService.send("setCpuFeedOff");
    this.sub.unsubscribe();
  }
}
