
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../service/';


@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent {
    constructor(
        private authService: Auth.AuthService,
        private router: Router
    ) { }

    rxName = Auth.RxLoginedUser.map(u => u.fullname);

    Logout() {
        this.authService.Logout();
    }

    hidden = true;

    Refresh() {
        setTimeout(() => {
            window.location.reload();
        }, 200);
    }
}