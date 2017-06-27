import { HttpServiceGenerator } from '../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '../../shared/util';

export interface IConfigLanguage {
    default: string,
    support: string[]
}
export interface IConfig {
    id?: string;
    key: string;
    value: IConfigLanguage;
    mtime: string;
    dtime: string;
}
@Injectable()
export class SetupAPI {
    constructor(
        private httpServiceGenerator: HttpServiceGenerator,
        private mdSnackBar: MdSnackBar,
        private translateService: TranslateService
    ) { }

    Update(v: IConfigLanguage) {
        this.api.Post<string>("update", { key: "Language" }, v).subscribe(v => {
            if (v === "ok") {
                this.mdSnackBar
                    .open(this.translateService.translate('Update Successfully'), 
                            this.translateService.translate('Close'), {
                    duration: 6000
                });
            }else{
                this.mdSnackBar
                    .open(this.translateService.translate('Update Error'), 
                            this.translateService.translate('Close'), {
                    duration: 6000
                });
            }
        });
    }
    GetByKey() {
        return this.api.Get<IConfig>("get_by_key", { key: "Language" })
    }

    api = this.httpServiceGenerator.make<any>("/api/admin/setting/global_config");

}
