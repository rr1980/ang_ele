import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AppStateService } from "./app-state.service";
import { UserViewModel } from "src/app/models/app-state.model";
import { ElectronService } from "ngx-electron";

class UserLoginRequest {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {


    public userViewModel: UserViewModel;

    constructor(private _ngZone: NgZone, private electronService: ElectronService, private appStateService: AppStateService) {
        this.appStateService.UserViewModel.subscribe((response) => {
            this.userViewModel = response;
        });
    };

    public isLoggedIn(): boolean {
        if (this.userViewModel) {
            return this.userViewModel.auth;
        }
        return false;
    }

    Login(userLoginRequest: UserLoginRequest) {
        console.debug("try login...", userLoginRequest);
        this.electronService.ipcRenderer.send('tryLogin', userLoginRequest);
    }
};