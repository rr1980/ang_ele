import { Injectable, NgZone } from "@angular/core";
import { HomeModel } from "../components/home/models/home.model";
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { ElectronService } from "ngx-electron";

@Injectable()
export class HomeService {

    private _homeModel: BehaviorSubject<HomeModel> = new BehaviorSubject(new HomeModel());

    get Model(): Observable<HomeModel> {

        if (!this._homeModel.getValue().isLoaded && !this._homeModel.getValue().isLoading) {
            var _model = this._homeModel.getValue()
            _model.isLoading = true;
            this._homeModel.next(_model);
            this.electronService.ipcRenderer.send('getInit');
            console.debug("...start load");
        }
        else if (this._homeModel.getValue().isLoaded && !this._homeModel.getValue().isLoading) {
            console.debug("...only read");
        }
        else if (!this._homeModel.getValue().isLoaded && this._homeModel.getValue().isLoading) {
            console.debug("...is loading");
        }

        return this._homeModel.asObservable();
    };

    constructor(private electronService: ElectronService, private _ngZone: NgZone) {
        this.electronService.ipcRenderer.on('getInit', (event, arg) => {
            console.debug("IPC: ", event, arg);

            arg.isLoaded = true;
            arg.isLoading = false;

            this._ngZone.run(() => {
                setTimeout(() => {
                    this._homeModel.next(arg as HomeModel);
                }, 3000);
              });
        })
    };
};