import { Component, EventEmitter, Output, Input, Optional, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectConfig, AppStorage } from '../../shared';

@Component({
    selector: 'user-setting',
    templateUrl: 'user-setting.html',
    styleUrls: ['user-setting.scss']
})
export class UserSettingComponent {
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
        protected dialogRef: MatDialogRef<any>,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        console.log('1')
        console.log(this.languages)
    }

    app = this.dialogData;
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

    goToConfig() {
        let url = this.router.routerState.snapshot.url.replace('/main', '/setting');
        this.router.navigate([url], {
            queryParamsHandling: 'preserve',
            relativeTo: this.route
        });
        this.close();
    }
}