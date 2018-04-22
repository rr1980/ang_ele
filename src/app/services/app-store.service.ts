import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ElectronService } from "ngx-electron";

interface Sub {
    key: string;
    bObj: BehaviorSubject<any>;
}

@Injectable()
export class AppStoreService {


    _datas: Sub[] = [];

    constructor(private electronService: ElectronService, private _ngZone: NgZone) { }

    get<T>(key: string): Observable<T> {

        var exist = this._datas.filter(o => o.key === key)[0];

        if (exist) {
            return exist.bObj.asObservable();
        }
        else {
            this._datas.push(
                {
                    key: key,
                    bObj: new BehaviorSubject(null),
                } as Sub
            );

            if (!this.arrayContains('key', this.electronService.ipcRenderer.eventNames())) {
                console.debug("listen on ", key);
                this.electronService.ipcRenderer.on(key, (event, arg) => this.emit(key, event, arg));
            }

            return this._datas.filter(o => o.key === key)[0].bObj.asObservable();
        }
    }

    send(key: string, data: any = null) {
        console.debug('send: ', key, data)
        this.electronService.ipcRenderer.send(key, data);
    }

    private emit(key, event, arg): any {
        var exists = this._datas.filter(o => o.key === key)[0];
        this._ngZone.run(() => {
            exists.bObj.next(arg);
        });
    }

    private arrayContains(needle, arrhaystack) {
        return (arrhaystack.indexOf(needle) > -1);
    }
}