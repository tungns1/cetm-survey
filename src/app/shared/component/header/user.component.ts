
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RuntimeEnvironment } from '../../env';
import { Observable } from 'rxjs/Observable';
import { AppStorage } from '../../shared';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent {
    constructor(
        private env: RuntimeEnvironment,
        private router: Router
    ) { }


    username = this.env.Auth.User$.map(u => u.fullname)

    Logout() {
        AppStorage.ClearToken();
        window.location.reload();
    }

    onBLur() {
        document.getElementById("myMenudrop").style.visibility = "hidden"
    }

    hidden = true;

    Refresh() {
        setTimeout(() => {
            window.location.reload();
        }, 200);
    }
} 