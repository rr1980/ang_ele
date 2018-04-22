import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { UserViewModel } from "src/app/models/app-state.model";
import { ElectronService } from "ngx-electron";
import { AppStoreService } from "./app-store.service";
import { Router } from "@angular/router";

class UserLoginRequest {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {


    public userViewModel: UserViewModel;

    constructor(private electronService: ElectronService, private appStoreService: AppStoreService, private router: Router) {
        this.appStoreService.get('setLogin').subscribe((response) => {

            this.userViewModel = response as UserViewModel;

            if (this.userViewModel && this.userViewModel.auth) {
                this.router.navigate(['/home']);
            }
            else {
                this.router.navigate(['/login']);
            }
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