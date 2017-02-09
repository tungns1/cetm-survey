import { Model, Branch, SharedService } from '../../shared/';
import { RepeatedObservable } from '../rx';
import { Injectable } from '@angular/core';

@Injectable()
export class ScreenApi extends SharedService.Backend.HttpApi<Model.House.IScreen> {
    constructor() {
        super("/api/admin/house/screen");
    }

    GetByBranch(branch_id: string) {
        return Branch.AddBranchName<Model.House.IScreen>(this.Search({ branch_id: branch_id }));
    }

    AutoRefresh() {
        return new RepeatedObservable(Branch.SelectedBranchIDLevel0, b => this.GetByBranch(b));
    }
}