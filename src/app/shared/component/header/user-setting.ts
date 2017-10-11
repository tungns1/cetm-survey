import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ProjectConfig, AppStorage } from '../../shared';

@Component({
    selector: 'user-setting',
    templateUrl: 'user-setting.html',
    styleUrls: ['user-setting.scss']
})
export class UserSettingComponent {
    constructor(
        protected dialogRef: MatDialogRef<any>
    ) { }

    languages = ProjectConfig.general.supported_languages;
    items = this.languages.map(l => {
        return {
            key: l,
            value: l
        };
    });
    culture = AppStorage.Locale;

    SetCulture(culture: string) {
        AppStorage.Locale = culture;
        window.location.reload();
    }

    close() {
        this.dialogRef.close();
    }
}