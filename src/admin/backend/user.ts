import { FormBuilder, Validators } from '@angular/forms';
import { Model, Branch, Backend } from '../shared/';

export const Api = new Backend.HttpApi<Model.IUser>("/api/admin/user");

export function GetByBranch(branch_id: string) {
    return Branch.AddBranchName<Model.IUser>(Api.Search({ branch_id: branch_id }));
}

import { RepeatedObservable } from './rx';
import { Observable } from 'rxjs/Observable';

const LowestBranchID = Branch.LowestLayerBranch.map(branches => {
    return branches.map(v => v.id).join(',');
})

export function AutoRefresh() {
    return new RepeatedObservable(LowestBranchID, GetByBranch);
}
