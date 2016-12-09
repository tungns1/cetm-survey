import { Injectable, Injector } from '@angular/core';
import { CanActivate, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AuthOptions, Refresh, IsAuth } from './auth.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (!IsAuth()) {
      return this.loginPage(route);
    }

    return Refresh().map(ok => {
      if (!ok) {
        this.loginPage(route);
      }
      return ok;
    }).toPromise();;
  }

  loginPage(route: ActivatedRouteSnapshot) {
    AuthOptions.Redirect = route.url;
    this.router.navigate(['/login']);
    return false
  }
}
