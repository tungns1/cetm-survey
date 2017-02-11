import { Model, Branch, SharedService } from '../shared/';
import { RepeatedObservable } from './rx';

const LowestBranchID = Branch.LowestLayerBranch.map(branches => {
    return branches.map(v => v.id).join(',');
})

import { Injectable } from '@angular/core';

@Injectable()
export class ConfigApi extends SharedService.Backend.HttpApi<Model.IConfig> {
    constructor() {
        super("/api/admin/config");
    }

    GetByBranch(branch_id: string) {
        return Model.Org.AddBranchName<Model.IConfig>(this.Search({ branch_id: branch_id }));
    }

    AutoRefresh() {
        return new RepeatedObservable(LowestBranchID, d => this.GetByBranch(d));
    }
}