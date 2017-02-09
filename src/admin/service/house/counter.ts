import { Model, Branch, SharedService } from '../../shared/';
import { RepeatedObservable } from '../rx';
import { Injectable } from '@angular/core';

@Injectable()
export class CounterApi extends SharedService.Backend.HttpApi<Model.House.ICounter> {
    constructor() {
        super("/api/admin/house/counter");
    }

    GetByBranch(branch_id: string) {
        return Branch.AddBranchName<Model.House.ICounter>(this.Search({ branch_id: branch_id }));
    }

    AutoRefresh() {
        return new RepeatedObservable(Branch.SelectedBranchIDLevel0, b => this.GetByBranch(b));
    }
}