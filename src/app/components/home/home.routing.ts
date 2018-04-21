import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// import { AuthGuard } from '../../guards/auth.guard';



const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { 
                path: 'dashboard', 
                loadChildren: "./components/dashboard/dashboard.module#DashboardModule" 
            },
        ]
    },
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class HomeRoutingModule { };

export const routedComponents = [HomeComponent, NavbarComponent];