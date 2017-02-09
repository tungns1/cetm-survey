import { Model, Branch, SharedService } from '../../shared/';
import { RepeatedObservable } from '../rx';
import { Injectable } from '@angular/core';

@Injectable()
export class SFlowApi extends SharedService.Backend.HttpApi<Model.House.ISFlow> {
    constructor() {
        super("/api/admin/house/sflow");
    }

    GetByBranch(branch_id: string) {
        return Branch.AddBranchName<Model.House.ISFlow>(this.Search({ branch_id: branch_id }));
    }

    AutoRefresh() {
        return new RepeatedObservable(Branch.SelectedBranchIDLevel0, b => this.GetByBranch(b));
    }
}