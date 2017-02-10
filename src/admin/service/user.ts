import { Model, Branch, SharedService } from '../shared/';
import { RepeatedObservable } from './rx';

const LowestBranchID = Branch.LowestLayerBranch.map(branches => {
    return branches.map(v => v.id).join(',');
})

import { Injectable } from '@angular/core';

@Injectable()
export class UserApi extends SharedService.Backend.HttpApi<Model.Org.IUser> {
    constructor() {
        super("/api/admin/user");
    }

    GetByBranch(branch_id: string) {
        return Branch.AddBranchName<Model.Org.IUser>(this.Search({ branch_id: branch_id }));
    }

    AutoRefresh() {
        return new RepeatedObservable(LowestBranchID, d => this.GetByBranch(d));
    }
}