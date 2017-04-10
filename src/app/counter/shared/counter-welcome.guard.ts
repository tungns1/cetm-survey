import { Injectable } from '@angular/core';
import {
  Router, ActivatedRoute,
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CounterSettingService } from './counter-setting.service';
import { RuntimeEnvironment, SessionValidationGuard, AuthService } from './shared';

/**
 * Check setting before redirect
 */
@Injectable()
export class CounterWelcomeGuard extends SessionValidationGuard {
  constructor(
    router: Router,
    authService: AuthService,
    private route: ActivatedRoute,
    private counterService: CounterSettingService,
    private env: RuntimeEnvironment
  ) { 
    super(router, authService);
  }

  protected GetAuthExtra() {
    return {
      branch_code: this.counterService.Data.branch_code,
      auto_login: true
    }
  }

  protected GetScope() {
    return "staff";
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return super.canActivate(next, state);
  }

}
