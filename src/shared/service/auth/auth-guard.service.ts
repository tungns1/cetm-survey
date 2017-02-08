import { Injectable, Injector } from '@angular/core';
import { CanActivate, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AuthOptions, Refresh, IsAuth } from './auth.service';

import 'rxjs/add/operator/toPromise';

const loginUrl = "/login";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (state.url === loginUrl) {
      return true;
    }

    if (!IsAuth()) {
      return this.loginPage(route, state);
    }

    return Refresh().map(ok => {
      if (!ok) {
        this.loginPage(route, state);
      }
      return ok;
    }).toPromise();
  }

  loginPage(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let branch_code = route.params['branch_code'];
    AuthOptions.redirect = state.url;
    AuthOptions.branch_code = branch_code;
    console.log(AuthOptions);
    this.router.navigate(['/login']);
    return false
  }
}
