import { Model, Branch, SharedService } from '../../shared/';
import { RepeatedObservable } from '../rx';

const LowestBranchID = Branch.LowestLayerBranch.map(branches => {
    return branches.map(v => v.id).join(',');
})

import { Injectable } from '@angular/core';

@Injectable()
export class UserApi extends SharedService.Backend.HttpApi<Model.Org.IUser> {
    constructor() {
        super("/api/admin/org/user");
    }

    GetByBranch(branch_id: string[]) {
        return this.Search({ branch_id: branch_id.join(',') });
    }

}