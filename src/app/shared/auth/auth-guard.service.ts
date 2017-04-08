import { Injectable, Injector } from '@angular/core';
import { CanActivate, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/toPromise';

const loginUrl = "/auth/login";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (state.url.startsWith(loginUrl)) {
      this.authService.SetRedirect(route);
      return true;
    }

    this.authService.SetRedirect(route, state.url);

    if (!this.authService.IsAuth()) {
      return this.loginPage(route, state);
    }

    return this.authService.Refresh().map(ok => {
      if (!ok) {
        this.loginPage(route, state);
      }
      return ok;
    }).toPromise();
  }

  loginPage(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const q = Object.assign({ redirect: state.url }, route.queryParams);
    this.router.navigate(['/auth/login'], {
      queryParams: q
    });
    return false
  }
}
