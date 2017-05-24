
import { HttpServiceGenerator, HttpApi } from '../../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Toast } from '../../../x/ui/noti/toastr';

export interface IChangePass {
    username: string;
    old_pass: string;
    new_pass: string;
    re_new_pass: string;
}

@Injectable()
export class AuthUserAPI {
    constructor(
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    toast = new Toast;
    ChangePass(v: IChangePass) {
        this.api.Post<string>("change_pass", {}, v).subscribe(v => {
            this.toast.Title('Success').Info("Update Success").Show();
        }, e => {
            this.toast.Title('Error').Info("Wrong Password").Show();
        });
    }

    api = this.httpServiceGenerator.make<any>("/api/auth");
}
