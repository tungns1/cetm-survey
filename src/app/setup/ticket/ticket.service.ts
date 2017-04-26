
import { HttpServiceGenerator } from '../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Toast } from '../../x/ui/noti/toastr';
import { Injectable } from '@angular/core';

export interface IConfigPriority {
    customer_priority:string;
    service_priority: string;
    vip_card: string;
    customer_vip: string;
    ticket_online: string;
    min_priority_for_call:string;
}
export interface IConfig {
    id?: string;
    key: string;
    value: IConfigPriority;
    mtime: string;
    dtime: string;
}
@Injectable()
export class SetupAPI {
    constructor(
        private httpServiceGenerator: HttpServiceGenerator
    ) { }
    toast = new Toast;

    Update(v: IConfigPriority) {
        this.api.Post<string>("update", { key: "TicketPriority" }, v).subscribe(v => {
            if (v === "ok") {
                this.toast.Title('Success').Info("Update Success").Show();
            } else {
                this.toast.Title('Error').Info("Update Error").Show();
            }
        });
    }
    GetByKey() {
        return this.api.Get<IConfig>("get_by_key", { key: "TicketPriority" })
    }

    api = this.httpServiceGenerator.make<any>("/api/admin/config");

}
