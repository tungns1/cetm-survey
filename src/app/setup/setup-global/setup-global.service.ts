
import { HttpServiceGenerator } from '../../shared/';
import { Toast } from '../../x/ui/noti/toastr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

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
        private httpServiceGenerator: HttpServiceGenerator
    ) { }
    toast = new Toast;

    Update(v: IConfigLanguage) {
        this.api.Post<string>("update", { key: "Language" }, v).subscribe(v => {
            if (v === "ok") {
                this.toast.Title('Success').Info("Update Success").Show();
            }else{
                this.toast.Title('Error').Info("Update Error").Show();
            }
        });
    }
    GetByKey() {
        return this.api.Get<IConfig>("get_by_key", { key: "Language" })
    }

    api = this.httpServiceGenerator.make<any>("/api/admin/setting/global_config");

}
