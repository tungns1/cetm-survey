import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
import { MdMenuTrigger, MdDialog, MdDialogConfig } from '@angular/material';
import { RuntimeEnvironment } from '../../env';
import { Observable } from 'rxjs/Observable';
import { AppStorage } from '../../shared';
import { ChangePassComponent } from './change-pass.component'

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent {
    constructor(
        private env: RuntimeEnvironment,
        // private router: Router,
        private mdDialog: MdDialog
    ) { }
    hidden = true;
    // private dialog: MdDialogRef<ChangePassComponent>;

    @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
    username = this.env.Auth.User$.map(u => u.fullname);

    Logout() {
        AppStorage.ClearToken();
        window.location.reload();
    }

    Refresh() {
        setTimeout(() => {
            window.location.reload();
        }, 200);
    }

    openChangePassModal(){
        const config = new MdDialogConfig();
        config.width = '350px';
        // config.data = t;
        const dialog = this.mdDialog.open(ChangePassComponent, config);
    }
} 