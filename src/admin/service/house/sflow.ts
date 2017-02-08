import { Model, Branch, SharedService } from '../../shared/';

export const Api = new SharedService.Backend.HttpApi<Model.House.ISFlow>("/api/admin/house/sflow");

export function GetByBranch(branch_id: string) {
    return Branch.AddBranchName<Model.House.ISFlow>(Api.Search({ branch_id: branch_id }));
}

import { RepeatedObservable } from '../rx';

export function AutoRefresh() {
    return new RepeatedObservable(Branch.SelectedBranchIDLevel0, GetByBranch);
}