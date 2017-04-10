
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RuntimeEnvironment } from '../../env';
import { Observable } from 'rxjs/Observable';

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