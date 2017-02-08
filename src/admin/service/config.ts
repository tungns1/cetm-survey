import { FormBuilder, Validators } from '@angular/forms';
import { Model, Branch, SharedService } from '../shared/';

export const Api = new SharedService.Backend.HttpApi<Model.IConfig>("/api/admin/config");

export function GetByBranch(branch_id: string) {
    return Branch.AddBranchName<Model.IConfig>(Api.Search({ branch_id: branch_id }));
}

import { RepeatedObservable } from './rx';
import { Observable } from 'rxjs/Observable';

const LowestBranchID = Branch.LowestLayerBranch.map(branches => {
    return branches.map(v => v.id).join(',');
})

export function AutoRefresh() {
    return new RepeatedObservable(LowestBranchID, GetByBranch);
}
