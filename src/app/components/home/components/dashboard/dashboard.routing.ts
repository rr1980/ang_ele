import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from '../../../../guards/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { CpuMonitorWidgetComponent } from './widgets/cpuMonitor-widget/cpuMonitor-widget.component';



const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class DashboardRoutes { };

export const routedComponents = [DashboardComponent, CpuMonitorWidgetComponent];
