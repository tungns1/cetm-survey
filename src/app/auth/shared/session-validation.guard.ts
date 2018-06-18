import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HttpError, AppStorage, RuntimeEnvironment } from './shared';
import { USER_ROLES } from '../../shared/model';
import { of } from 'rxjs/observable/of'
import { PlatformEnvStorage } from '../../shared/env/shared/platform';

interface IAuthExtra {
    branch_code?: string;
    auto_login?: boolean;
}

@Injectable()
export class SessionValidationGuard implements CanActivate {
    constructor(
        protected router: Router,
        private authService: AuthService,
        private env: RuntimeEnvironment,
    ) { }

    Platform = new PlatformEnvStorage();
    protected GetAuthExtra() {
        return {};
    }

    protected GetScope() {
        return "admin";
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        // console.log(this.Platform.Data)
        
        // if (!this.Platform.Data.auto_login) {
        //     if (!sessionStorage.getItem('login_session')) {
        //         AppStorage.ClearToken()
        //     }
        // }
        if(!AppStorage.AutoLogin){
            AppStorage.ClearToken()
        }
        if (!AppStorage.HasToken()) {
            this.ShowLogin(state.url);
            return false;
        }
        return this.authService.ValidateSession(this.GetScope())
            .do(success => {
                if (!success) {
                    
                    this.ShowLogin(state.url);
                }
                // this.env.Auth.User$.subscribe(u => {
                //   if (u.role.indexOf(USER_ROLES.MEDIA) !== -1) 
                //       window.location.href = '/#/admin/house/screen/list'
                // })
            })
    }

    private ShowLogin(redirect: string) {
        const query = this.GetAuthExtra();
        query["scope"] = this.GetScope();
        query["redirect"] = redirect;
        this.router.navigate(["/auth/login"], {
            queryParams: query,
            queryParamsHandling: "merge"
        });
    }
}
