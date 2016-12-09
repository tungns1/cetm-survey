
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxLoginedUser } from '../../../shared/session/';
import { Logout } from '../../../shared/auth/';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent {
    constructor(private router: Router) {
    }

    rxName = RxLoginedUser.map(u => u.fullname);

    Logout() {
        Logout();
        this.router.navigate(['/login']);
    }
}