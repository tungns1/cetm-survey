import { Injectable } from '@angular/core';
import { Model, Branch, SharedService } from '../../shared/';
import { BranchCrudApiService, AdminFilter } from '../shared';

@Injectable()
export class UserService extends BranchCrudApiService<Model.Org.IUser> {
    protected filter(d: AdminFilter) {
        return this.GetByBranch(d.Branch.GetBranchIDAtLowestLevel())
            .do(data => Model.Org.CacheBranch.Join(data));
    }

    ListFields = [
        { title: 'LANGAUGE_BRANCH', name: 'branch' },
        { title: 'LANGAUGE_FULLNAME', name: 'fullname' }
    ]

    Name = "LANGAUGE_USER";
}
