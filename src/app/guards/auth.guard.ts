import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    static count: number = 0;


    constructor(private router: Router) { };

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {

        AuthGuard.count++;

        console.debug(AuthGuard.count);

        if (AuthGuard.count < 2) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    };

    canActivate(route: ActivatedRouteSnapshot) {


        this.router.navigate(['/login']);
        return false;
    };
};
