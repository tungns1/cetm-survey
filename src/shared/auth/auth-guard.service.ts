import { Injectable, Injector } from '@angular/core';
import { CanActivate, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (!this.authService.IsLoggedIn()) {
      return this.loginPage(route);
    }

    return this.authService.Refresh().map(ok => {
      if (!ok) {
        this.loginPage(route);
      }
      return ok;
    }).toPromise();;
  }

  loginPage(route: ActivatedRouteSnapshot) {
    this.authService.Redirect = route.url;
    this.authService.Scope = route.data['scope'];
    this.authService.Auto = route.data['auto'];
    this.router.navigate(['/login']);
    return false
  }
}
