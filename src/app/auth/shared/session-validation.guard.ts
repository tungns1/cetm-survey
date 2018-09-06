import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Observable ,  of } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpError, AppStorage, RuntimeEnvironment } from './shared';
import { USER_ROLES } from '../../shared/model';
import { PlatformEnvStorage } from '../../shared/env/shared/platform';
import { HostListener } from '@angular/core'
import { tap, map, switchMap } from 'rxjs/operators';
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
    protected GetAuthExtra():Observable<any> {
        return of({})
    }

    protected GetScope() {
        return "admin";
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        // console.log(this.Platform.Data)
        
        if(!AppStorage.AutoLogin){
            if (!sessionStorage.getItem('login_session')) {
                AppStorage.ClearToken()
            }
        }
        if (!AppStorage.HasToken()) {
            this.ShowLogin(state.url);
            return false;
        }
        return this.authService.ValidateSession(this.GetScope())
            // .pipe(tap(success => {
            //     if (!success) {
                    
            //         this.ShowLogin(state.url);
            //     }
            //     // this.env.Auth.User$.subscribe(u => {
            //     //   if (u.role.indexOf(USER_ROLES.MEDIA) !== -1) 
            //     //       window.location.href = '/#/admin/house/screen/list'
            //     // })   
            // }))
            .pipe(map(s => {
                if (!s) {
                    this.ShowLogin(state.url);
                }
            }), switchMap(_ => {
                return this.authService.getUser()
            }), switchMap(u => {
                if(u.role === 'manager'){
                    let regex = /(\/)[\w]*/gm;
                    let match = state.url.match(regex)
                    let allow = ["/report", "/monitor"];
                    if(match && allow.includes(match[0]) === false){
                        this.router.navigate(["/report/dashboard"])
                    }
                }
                return of(true)
            }))
    }

    private ShowLogin(redirect: string) {
        
        const query = this.GetAuthExtra();
        query.subscribe(v => {
            if(v){
                v["scope"] = this.GetScope();
                v["redirect"] = redirect;
                this.router.navigate(["/auth/login"], {
                    queryParams: v,
                    queryParamsHandling: "merge"
                });
            }
        })
    }
}
