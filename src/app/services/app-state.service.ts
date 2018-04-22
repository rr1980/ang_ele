import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { ElectronService } from "ngx-electron";
import { AppStateViewModel, CpuViewModel, UserViewModel } from "../models/app-state.model";
import { Router } from "@angular/router";

@Injectable()
export class AppStateService {

    private _ppStateViewModel: BehaviorSubject<AppStateViewModel> = new BehaviorSubject(new AppStateViewModel());
    private _cpuViewModel: BehaviorSubject<CpuViewModel> = new BehaviorSubject(new CpuViewModel());
    private _userViewModel: BehaviorSubject<UserViewModel> = new BehaviorSubject(new UserViewModel());


    constructor(private electronService: ElectronService, private _ngZone: NgZone, private router: Router) {
        this.electronService.ipcRenderer.on('getInit', (event, arg) => {
            console.debug("IPC: ", event, arg);

            arg.isLoaded = true;
            arg.isLoading = false;

            this._ngZone.run(() => {
                this._ppStateViewModel.next(arg as AppStateViewModel);
            });
        })

        this.electronService.ipcRenderer.on('setCpus', (event, arg) => {
            this._ngZone.run(() => {
                this._cpuViewModel.next(arg as CpuViewModel);
            });
        })

        this.electronService.ipcRenderer.on('setLogin', (event, arg) => {
            console.log("setLogin... ", arg);
            this._ngZone.run(() => {
                this._userViewModel.next(arg as UserViewModel);
                if(this._userViewModel.getValue().auth){
                    this.router.navigate(['/home']);
                }
                else{
                    this.router.navigate(['/login']);
                }
            });
        })
    };

    get AppStateViewModel(): Observable<AppStateViewModel> {

        if (!this._ppStateViewModel.getValue().isLoaded && !this._ppStateViewModel.getValue().isLoading) {

            var _model = this._ppStateViewModel.getValue()
            _model.isLoading = true;
            this._ppStateViewModel.next(_model);

            this.electronService.ipcRenderer.send('getInit');
            console.debug("...start load");
        }
        else if (this._ppStateViewModel.getValue().isLoaded && !this._ppStateViewModel.getValue().isLoading) {
            console.debug("...only read");
        }
        else if (!this._ppStateViewModel.getValue().isLoaded && this._ppStateViewModel.getValue().isLoading) {
            console.debug("...is loading");
        }

        return this._ppStateViewModel.asObservable();
    };


    get CpuViewModel(): Observable<CpuViewModel> {
        return this._cpuViewModel.asObservable();
    };

    get UserViewModel(): Observable<UserViewModel> {
        return this._userViewModel.asObservable();
    };
};