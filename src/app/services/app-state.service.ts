import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { ElectronService } from "ngx-electron";
import { AppStateViewModel, CpuViewModel, UserViewModel } from "../models/app-state.model";
import { Router } from "@angular/router";

@Injectable()
export class AppStateService {

    private _isInit: boolean = false;

    private _appStateViewModel: BehaviorSubject<AppStateViewModel> = new BehaviorSubject(new AppStateViewModel());

    // get AppStateViewModel(): Observable<AppStateViewModel> {
    //     return this._appStateViewModel.asObservable();
    // };

    get AppStateViewModel() {

        var self=this;

        return {
            get: this._appStateViewModel.asObservable(),
            setCpuFeedOn: function(){
                self.electronService.ipcRenderer.send('setCpuFeedOn');
            },
            setCpuFeedOff: function(){
                self.electronService.ipcRenderer.send('setCpuFeedOff');
            }
        };
    };


    constructor(private electronService: ElectronService, private _ngZone: NgZone, private router: Router) {

    };

    init() {
        console.debug("OnInit!!!");
        this.electronService.ipcRenderer.on('getInit', (event, arg) => this.getInit(event, arg));
        this.electronService.ipcRenderer.on('setCpus', (event, arg) => this.setCpus(event, arg));
        this.electronService.ipcRenderer.on('setLogin', (event, arg) => this.setLogin(event, arg));
        this.electronService.ipcRenderer.send('getInit');
    }

    private getInit(event, arg) {
        arg.isLoaded = true;
        arg.isLoading = false;
        this._ngZone.run(() => {
            this._appStateViewModel.next(arg as AppStateViewModel);
            this._isInit = true;
        });
    }

    private setCpus(event, arg) {
        if (this._isInit) {
            var vm = this._appStateViewModel.getValue();
            vm.cpu = arg as CpuViewModel;
            this._ngZone.run(() => {
                this._appStateViewModel.next(vm);
            });
        }
    }

    private setLogin(event, arg) {
        if (this._isInit) {
            var vm = this._appStateViewModel.getValue();
            vm.user = arg as UserViewModel;
            this._ngZone.run(() => {
                this._appStateViewModel.next(vm);

                if (vm.user.auth) {
                    this.router.navigate(['/home']);
                }
                else {
                    this.router.navigate(['/login']);
                }
            });
        }
    }
};