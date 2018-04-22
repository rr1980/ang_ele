import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { ElectronService } from "ngx-electron";
import { AppStateModel } from "../models/app-state.model";

@Injectable()
export class AppStateService {

    private _appStateModel: BehaviorSubject<AppStateModel> = new BehaviorSubject(new AppStateModel());
    get AppStateModel(): Observable<AppStateModel> {

        if (!this._appStateModel.getValue().isLoaded && !this._appStateModel.getValue().isLoading) {

            var _model = this._appStateModel.getValue()
            _model.isLoading = true;
            this._appStateModel.next(_model);

            this.electronService.ipcRenderer.send('getInit');
            console.debug("...start load");
        }
        else if (this._appStateModel.getValue().isLoaded && !this._appStateModel.getValue().isLoading) {
            console.debug("...only read");
        }
        else if (!this._appStateModel.getValue().isLoaded && this._appStateModel.getValue().isLoading) {
            console.debug("...is loading");
        }

        return this._appStateModel.asObservable();
    };

    constructor(private electronService: ElectronService, private _ngZone: NgZone) {
        this.electronService.ipcRenderer.on('getInit', (event, arg) => {
            console.debug("IPC: ", event, arg);

            arg.isLoaded = true;
            arg.isLoading = false;

            this._ngZone.run(() => {
                // setTimeout(() => {
                    this._appStateModel.next(arg as AppStateModel);
                // }, 3000);
              });
        })
    };
};