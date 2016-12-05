import { FormBuilder, Validators } from '@angular/forms';
import { Model, Branch, Backend } from '../shared/';

export const Api = new Backend.HttpApi<Model.IUser>("/api/admin/user");

export function GetByBranch(branch_id: string) {
    return Branch.AddBranchName<Model.IUser>(Api.Search({ branch_id: branch_id }));
}

import { RepeatedObservable } from './rx';
import { Observable } from 'rxjs/Observable';

export function AutoRefresh(trigger?: Observable<any>) {
    return new RepeatedObservable(trigger || Branch.SelectedBranchIDLevel0, GetByBranch);
}
