
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, LOCALES, AppStorage } from '../../shared';

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


    items = Object.keys(LOCALES.LANGUAGES).map(l => {
        return {
            key: l,
            value: LOCALES.LANGUAGES[l]
        };
    });

    locale = AppStorage.Locale;

    SetLocale(locale: string) {
        AppStorage.Locale = locale;
        window.location.reload();
    }


}