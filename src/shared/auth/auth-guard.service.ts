import { Injectable, Injector } from '@angular/core';
import { CanActivate, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import * as Auth from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (Auth.IsLoggedIn()) {
      return true;
    }

    return Auth.Refresh().map(ok => {
      if (!ok) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            redirect: route.url,
            auto: route.data['auto']
          }
        };
        this.router.navigate(['/login'], navigationExtras);
      }
      return ok;
    });
  }
}
