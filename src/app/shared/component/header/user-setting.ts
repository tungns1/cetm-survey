
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '../../shared';

@Component({
    selector: 'user-setting',
    templateUrl: 'user-setting.html',
    styleUrls: ['user-setting.scss']
})
export class UserSettingComponent {
    constructor(private translate: TranslateService) { }

    @Output() close = new EventEmitter();

    Close() {
        this.close.next();
    }
}