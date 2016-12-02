import { FormBuilder, Validators } from '@angular/forms';
import { Model, Branch, Backend } from '../shared/';

export function NewForm(u?: Model.IUser) {
    u = u || <any>{};
    return (new FormBuilder).group({
        id: [u.id],
        password: ['', u.id ? null : Validators.required], // do not require password on update
        username: [u.username, Validators.required],
        fullname: [u.fullname, Validators.required],
        email: [u.email],
        role: [u.role, Validators.required],
        branch_id: [u.branch_id, Validators.required],
    });
}

export const Api = new Backend.HttpApi<Model.IUser>("/api/admin/user");

export function GetByBranch(branch_id: string) {
    return Branch.AddBranchName<Model.IUser>(Api.Search({ branch_id: branch_id }));
}

import { RepeatedObservable } from './rx';
import { Observable } from 'rxjs/Observable';

export function AutoRefresh(trigger: Observable<string>) {
    return new RepeatedObservable(trigger, GetByBranch);
}
