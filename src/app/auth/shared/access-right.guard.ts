import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AccessRightGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) {}

  protected scope = "admin";
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.ValidateSession(this.scope).pipe(map(_ => true));
  }
}
