
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectConfig, AppStorage } from '../../shared';

@Component({
    selector: 'user-setting',
    templateUrl: 'user-setting.html',
    styleUrls: ['user-setting.scss']
})
export class UserSettingComponent {

    @Output() close = new EventEmitter();

    Close() {
        this.close.next();
    }

    languages = ProjectConfig.general.supported_languages;

    items = this.languages.map(l => {
        return {
            key: l,
            value: l
        };
    });

    locale = AppStorage.Locale;

    SetLocale(locale: string) {
        AppStorage.Locale = locale;
        window.location.reload();
    }
}