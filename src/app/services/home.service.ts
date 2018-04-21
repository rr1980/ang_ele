import { Injectable, NgZone } from "@angular/core";
import { HomeModel } from "../components/home/models/home.model";
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { ElectronService } from "ngx-electron";

@Injectable()
export class HomeService {


    private _isLoading: boolean = false;
    private _isLoaded: boolean = false;
    private _homeModel: BehaviorSubject<HomeModel> = new BehaviorSubject(new HomeModel());

    get Model(): Observable<HomeModel> {

        if (!this._isLoaded && !this._isLoading) {
            this._isLoading = true;
            this.electronService.ipcRenderer.send('getInit');
            console.debug("...start load");
        }
        else if (this._isLoaded && !this._isLoading) {
            console.debug("...only read");
        }
        else if (!this._isLoaded && this._isLoading) {
            console.debug("...is loading");
        }

        return this._homeModel.asObservable();
    };

    constructor(private electronService: ElectronService, private _ngZone: NgZone) {
        this.electronService.ipcRenderer.on('getInit', (event, arg) => {
            console.debug("IPC: ", event, arg);

            this._ngZone.run(() => {
                this._homeModel.next(arg as HomeModel);
              });

            this._isLoaded = true;
            this._isLoading = false;
        })
    };
};