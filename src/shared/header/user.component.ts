
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxMySetting } from '../session/';
import { AuthService } from '../auth/';

@Component({

    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent {
    constructor(private router: Router, private authService: AuthService) {
    }

    get Fullname() {
        const v = RxMySetting.value;
        if (v && v.me) {
            return v.me.fullname;
        }
        return '';
    }

    Logout() {
        this.authService.Logout();
        this.router.navigate(['']);
    }
}