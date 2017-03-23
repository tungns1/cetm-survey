import { Injectable } from '@angular/core';
import { BranchCrudApiService, IUser, CacheBranch } from '../shared';

@Injectable()
export class UserService extends BranchCrudApiService<IUser> {
    protected filter() {
        return this.GetByBranch(this.branchFilter.getLowestBranches())
            .do(data => CacheBranch.Join(data));
    }
}
