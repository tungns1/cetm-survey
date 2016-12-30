import { Injectable, Injector } from '@angular/core';
import { CanActivate, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AuthOptions, Refresh, IsAuth } from './auth.service';

import 'rxjs/add/operator/toPromise';

const loginUrl = "/login";
export const RxBranchCode = new BehaviorSubject<string>('');

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    let branch_code = route.params['branch_code'];
    RxBranchCode.next(branch_code);

    if (state.url === loginUrl) {
      return true;
    }

    if (!IsAuth()) {
      return this.loginPage(state);
    }

    return Refresh().map(ok => {

      if (!ok) {
        this.loginPage(state);
      }
      return ok;
    }).toPromise();
  }

  loginPage(state: RouterStateSnapshot) {
    AuthOptions.Redirect = state.url;
    console.log(AuthOptions);
    this.router.navigate(['/login']);
    return false
  }
}
