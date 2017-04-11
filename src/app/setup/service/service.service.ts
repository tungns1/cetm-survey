
import { HttpServiceGenerator } from '../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Toast } from '../../x/ui/noti/toastr';

export interface IConfigTime {
   max_serving:string;
   max_waiting:string;
   auto_finish:string;
}
export interface IConfig{
    id?:string;
    key:string;
    value:IConfigTime;
    mtime:string;
    dtime:string;
}
@Injectable()
export class SetupAPI {
    constructor(
        private httpServiceGenerator: HttpServiceGenerator
    ) { }
 toast = new Toast;
    Update(v: IConfigTime) {
        this.api.Post<string>("update", {key:"TimeService"}, v).subscribe(v => {
            if (v === "ok") {
                this.toast.Title('Success').Info("Update Success").Show();
            }else{
                this.toast.Title('Error').Info("Update Error").Show();
            }
        });
    }
    GetByKey(){
        return this.api.Get<IConfig>("get_by_key",{key:"TimeService"})
    }

    api = this.httpServiceGenerator.make<any>("/api/admin/config");

}
