import { Model, Branch, SharedService } from '../../shared/';
import { RepeatedObservable } from '../rx';
import { Injectable } from '@angular/core';

@Injectable()
export class KioskApi extends SharedService.Backend.HttpApi<Model.House.IKiosk> {
    constructor() {
        super("/api/admin/house/kiosk");
    }

    GetByBranch(branch_id: string) {
        return Model.Org.AddBranchName<Model.House.IKiosk>(this.Search({ branch_id: branch_id }));
    }

    AutoRefresh() {
        return new RepeatedObservable(Branch.SelectedBranchIDLevel0, b => this.GetByBranch(b));
    }
}