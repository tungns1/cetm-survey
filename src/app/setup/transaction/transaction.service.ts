
import { HttpServiceGenerator } from '../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Toast } from '../../x/ui/noti/toastr';
import { Injectable } from '@angular/core';

export interface IConfigTransaction {
    serving_time:string;
   attended:boolean;
}
export interface IConfig {
    id?: string;
    key: string;
    value: IConfigTransaction;
    mtime: string;
    dtime: string;
}
@Injectable()
export class SetupAPI {
    constructor(
        private httpServiceGenerator: HttpServiceGenerator
    ) { }
    toast = new Toast;

    Update(v: IConfigTransaction) {
        this.api.Post<string>("update", { key: "Translation" }, v).subscribe(v => {
            if (v === "ok") {
                this.toast.Title('Success').Info("Update Success").Show();
            } else {
                this.toast.Title('Error').Info("Update Error").Show();
            }
        });
    }
    GetByKey() {
        return this.api.Get<IConfig>("get_by_key", { key: "Translation" })
    }

    api = this.httpServiceGenerator.make<any>("/api/admin/config");

}
