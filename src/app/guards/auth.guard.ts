import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private router: Router, private authService: AuthService) { };

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {

        if (this.authService.isLoggedIn()) {
            return true;
        }


        this.router.navigate(['/login']);
        return false;

    };

    canActivate(route: ActivatedRouteSnapshot) {


        this.router.navigate(['/login']);
        return false;
    };
};
