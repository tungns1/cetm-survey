import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { MatMenuTrigger, MatDialog, MatDialogConfig } from '@angular/material';
import { RuntimeEnvironment } from '../../env';
import { Observable } from 'rxjs/Observable';
import { AppStorage } from '../../shared';
import { NoticeComponent } from '../../../../lib/ng2';
import { ChangePassComponent } from './change-pass.component'
import { UserSettingComponent } from './user-setting'

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent {
    constructor(
        private env: RuntimeEnvironment,
        private mdDialog: MatDialog
    ) { }
    hidden = true;
    _isServing: boolean;

    @ViewChild(NoticeComponent) notice: NoticeComponent;
    @Input() app: 'qapp' | 'counter' | 'superCounter' = 'qapp';
    @Input() set isServing(d: boolean) {
        this._isServing = d;
    }

    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    username = this.env.Auth.User$.map(u => u.fullname);

    Logout() {
        if (this.app === 'counter' && this._isServing) {
            this.notice.ShowMessage("must_finish_first");
            return;
        }
        AppStorage.ClearToken();
        window.location.reload();
    }

    Refresh() {
        setTimeout(() => {
            window.location.reload();
        }, 20);
    }

    openChangePassModal() {
        const config = new MatDialogConfig();
        config.width = '350px';
        const dialog = this.mdDialog.open(ChangePassComponent, config);
    }

    openSettingModal() {
        const config = new MatDialogConfig();
        config.width = '350px';
        config.data = this.app;
        const dialog = this.mdDialog.open(UserSettingComponent, config);
    }
} 