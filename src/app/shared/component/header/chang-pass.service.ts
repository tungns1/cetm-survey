import { HttpServiceGenerator, HttpApi } from '../../../shared/service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '../../../shared/util';

export interface IChangePass {
    username: string;
    old_pass: string;
    new_pass: string;
    re_new_pass: string;
}

@Injectable()
export class AuthUserAPI {
    constructor(
        private httpServiceGenerator: HttpServiceGenerator,
        private matSnackBar: MatSnackBar,
        private translateService: TranslateService
    ) { }

    ChangePass(v: IChangePass) {
        this.api.Post<string>("change_pass", {}, v).subscribe(v => {
            this.matSnackBar
                .open(this.translateService.translate('Update Successfully'),
                this.translateService.translate('Close'), {
                    duration: 6000
                });
        }, e => {
            this.matSnackBar
                .open(this.translateService.translate('Wrong Password'),
                this.translateService.translate('Close'), {
                    duration: 6000
                });
        });
    }

    api = this.httpServiceGenerator.make<any>("/api/auth");
}
