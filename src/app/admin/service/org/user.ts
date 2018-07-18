import { Injectable } from '@angular/core';
import { BranchCrudApiService, IUser, CacheBranch } from '../shared';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService extends BranchCrudApiService<IUser> {
    protected filter() {
        return this.GetByBranch(this.branchFilter.getLowestBranches())
            .pipe(tap(data => CacheBranch.Join(data)));
    }
}
