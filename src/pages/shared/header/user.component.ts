
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxLoginedUser } from '../../../shared/session/';
import { AuthService } from '../../../shared/auth/';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent {
    constructor(private router: Router, private authService: AuthService) {
    }

    rxName = RxLoginedUser.map(u => u.fullname);

    Logout() {
        this.authService.Logout();
        this.router.navigate(['/']);
    }
}