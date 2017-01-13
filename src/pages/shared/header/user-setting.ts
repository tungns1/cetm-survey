
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RxLoginedUser } from '../../../shared/session/';
import { Logout } from '../../../shared/auth/';
import { ModalComponent } from '../../../x/ui/modal';
import { I18n } from '../../../shared';

@Component({
    selector: 'user-setting',
    templateUrl: 'user-setting.html',
    styleUrls: ['user-setting.scss']
})
export class UserSettingComponent {
    constructor(private translate: I18n.TranslateService) { }

    @Output() close = new EventEmitter();

    Close() {
        this.close.next();
    }
}