import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../shared';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(
    private authService: SharedService.Auth.AuthService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const q = next.queryParams;
    this.authService.scope = 'staff';
    Object.assign(this.authService.options, q);
    return true;
  }
}
