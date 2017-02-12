import { Injectable } from '@angular/core';
import { Model, Branch, SharedService } from '../../shared/';
import { BranchCrudApiService, AdminFilter } from '../shared';

@Injectable()
export class UserService extends BranchCrudApiService<Model.Org.IUser> {
    protected filter(d: AdminFilter) {
        return this.GetByBranch(d.GetBranchIDAtLowestLevel())
            .do(data => Model.Org.CacheBranch.Join(data));
    }

    ListFields = [
        { title: 'LABEL_BRANCH', name: 'branch' },
        { title: 'LABEL_FULLNAME', name: 'fullname' }
    ]

    Name = "LABEL_USER";
}
