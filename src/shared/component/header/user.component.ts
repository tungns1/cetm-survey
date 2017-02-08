
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Session, Auth } from '../../service/';


@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent {
    constructor(private router: Router) {
    }

    rxName = Session.RxLoginedUser.map(u => u.fullname);

    Logout() {
        Auth.Logout;
    }

    hidden = true;

    Refresh() {
        setTimeout(() => {
            window.location.reload();
        }, 200);
    }
}