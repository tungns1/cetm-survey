import { Injectable } from '@angular/core';
import {
  Router, ActivatedRoute,
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CounterSettingService } from './counter-setting.service';
import { RuntimeEnvironment } from './shared';

/**
 * Check setting before redirect
 */
@Injectable()
export class CounterWelcomeGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private counterService: CounterSettingService,
    private env: RuntimeEnvironment
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.env.Auth.HasToken) {
      this.env.Auth.ShowLogin({
        scope: "staff",
        branch_code: this.counterService.Data.branch_code,
        redirect: state.url
      });
    }
    if (!this.counterService.IsChecked) {
      this.Welcome();
      return false;
    }
    return true;
  }

  Welcome() {
    this.router.navigate(["/counter/welcome"]);
  }

}
