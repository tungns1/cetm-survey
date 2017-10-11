import { HttpServiceGenerator } from '../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '../../shared/util';

export interface IConfigTime {
    max_serving: string;
    max_waiting: string;
    auto_finish: string;
    waiting_rate: string;
    serving_rate: string;
}
export interface IConfig {
    id?: string;
    key: string;
    value: IConfigTime;
    mtime: string;
    dtime: string;
}
@Injectable()
export class SetupAPI {
    constructor(
        private httpServiceGenerator: HttpServiceGenerator,
        private matSnackBar: MatSnackBar,
        private translateService: TranslateService
    ) { }
    Update(v: IConfigTime) {
        this.api.Post<string>("update", { key: "TimeService" }, v).subscribe(v => {
            if (v === "ok") {
                this.matSnackBar
                    .open(this.translateService.translate('Update successfully'), 
                            this.translateService.translate('Close'), {
                    duration: 6000
                });
            } else {
                this.matSnackBar
                    .open(this.translateService.translate('Update Error'), 
                            this.translateService.translate('Close'), {
                    duration: 6000
                });
            }
        });
    }
    GetByKey() {
        return this.api.Get<IConfig>("get_by_key", { key: "TimeService" })
    }

    api = this.httpServiceGenerator.make<any>("/api/admin/setting/global_config");

}
