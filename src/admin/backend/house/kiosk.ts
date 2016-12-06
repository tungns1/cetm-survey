import { Model, Branch, Backend } from '../../shared/';

export const Api = new Backend.HttpApi<Model.House.IKiosk>("/api/admin/house/kiosk");

export function GetByBranch(branch_id: string) {
    return Branch.AddBranchName<Model.House.IKiosk>(Api.Search({ branch_id: branch_id }));
}

import { RepeatedObservable } from '../rx';

export function AutoRefresh() {
    return new RepeatedObservable(Branch.SelectedBranchIDLevel0, GetByBranch);
}