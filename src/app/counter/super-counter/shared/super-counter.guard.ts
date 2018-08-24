import { SessionValidationGuard, AuthService, RuntimeEnvironment, AppStorage } from '../../shared'
import { NgModule, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SuperCounterSettingService } from './super-counter-setting.service';
import { Observable ,  of } from 'rxjs';
/**
 * Check setting before redirect
 */
@Injectable()
export class SuperCounterGuard extends SessionValidationGuard implements CanActivate {
    constructor(
        router: Router,
        authService: AuthService,
        private settingService: SuperCounterSettingService,
        env: RuntimeEnvironment
    ) {
        super(router, authService, env);
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        if (this.settingService.Check()) {

            return super.canActivate(next, state);
        }
        this.router.navigate(['/counter/welcome'], {
            queryParams: {
                redirect: this.settingService.Check() ? '/counter/super/main' : '/counter/super/setting',
                setting: '/counter/super/setting'
            }
        });
        return false;
    }

    GetAuthExtra() {
        return of({
            branch_code: this.settingService.Data.branch_code,
            // auto_login: AppStorage.AutoLogin
            auto_login: false
        })
    }

    GetScope() {
        return "staff";
    }

}
