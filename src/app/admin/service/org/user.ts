import { Injectable } from '@angular/core';
import { BranchCrudApiService, AdminFilter, IUser, CacheBranch } from '../shared';

@Injectable()
export class UserService extends BranchCrudApiService<IUser> {
    protected filter(d: AdminFilter) {
        return this.GetByBranch(d.Branch.GetBranchIDAtLowestLevel())
            .do(data => CacheBranch.Join(data));
    }

    ListFields = [
        { title: 'Branch', name: 'branch' },
        { title: 'Fullname', name: 'fullname' }
    ]

    Name = "LANGAUGE_USER";
}
