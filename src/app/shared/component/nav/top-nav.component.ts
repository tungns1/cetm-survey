import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RuntimeEnvironment } from '../../env';
import { USER_ROLES } from '../../model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'top-nav',
    templateUrl: 'top-nav.component.html',
    styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent {
    constructor(
        private router: Router,
        private env: RuntimeEnvironment,
    ) { 
        this.isAdminStandard$.subscribe(d => this.isAdminStandard = d);
     }


    isAdmin$ = this.env.Auth.User$.pipe(map(u =>
        u.role.indexOf(USER_ROLES.ADMIN) !== -1
    ));

    isMedia$ = this.env.Auth.User$.pipe(map(u =>
        u.role.indexOf(USER_ROLES.MEDIA) !== -1
    ));

    isAdminStandard$ = this.env.Auth.User$.pipe(map(u =>
        u.role.indexOf(USER_ROLES.ADMIN_STANDARD) !== -1
    ));
    
    isAdminStandard: boolean;

    private isActive(route: string) {
        if (this.router.url.indexOf('ticketlayout') > -1 && route.indexOf('kiosk') > -1) return true;
        if (this.router.url.indexOf(route) > -1) {
            if (this.router.url.startsWith('/admin')) {
                if (this.router.url.indexOf('kiosk') > -1 && route.indexOf('kiosk') <= -1) return false;
                if (this.router.url.indexOf('screen') > - 1 && route.indexOf('screen') <= -1) return false;
                if (this.router.url.indexOf('feedback') > - 1 && route.indexOf('feedback') <= -1) return false;
                if (this.router.url.indexOf('survey') > - 1 && route.indexOf('survey') <= -1) return false;
                if (this.router.url.indexOf('ticketlayout') > -1 && route.indexOf('admin') > -1) return false;
                return true;
            }
            else return true;
        }
        return false;
    }
}
