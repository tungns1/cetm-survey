import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HttpError, AppStorage, RuntimeEnvironment } from './shared';
import { USER_ROLES } from '../../shared/model'

interface IAuthExtra {
  branch_code?: string;
  auto_login?: boolean;
}

@Injectable()
export class SessionValidationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private env: RuntimeEnvironment
  ) { }


  protected GetAuthExtra() {
    return {};
  }

  protected GetScope() {
    return "admin";
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    if (!AppStorage.HasToken()) {
      this.ShowLogin(state.url);
      return Observable.of(false);
    }
    return this.authService.ValidateSession(this.GetScope())
      .do(success => {
        if (!success) {
          this.ShowLogin(state.url);
        }
        this.env.Auth.User$.subscribe(u => {
          if (u.role.indexOf(USER_ROLES.MEDIA) !== -1) 
              window.location.href = '/#/admin/house/screen/list'
        })
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
