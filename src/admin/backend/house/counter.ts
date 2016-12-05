import { Model, Branch, Backend } from '../../shared/';

export const Api = new Backend.HttpApi<Model.ICounter>("/api/admin/house/counter");

export function GetByBranch(branch_id: string) {
    return Branch.AddBranchName<Model.ICounter>(Api.Search({ branch_id: branch_id }));
}

import { RepeatedObservable } from '../rx';

export function AutoRefresh() {
    return new RepeatedObservable(Branch.SelectedBranchIDLevel0, GetByBranch);
}