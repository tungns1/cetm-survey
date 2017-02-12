import { Injectable } from '@angular/core';
import { Model, Branch, SharedService } from '../../shared/';
import { CrudApiService, AdminFilter } from '../shared';

@Injectable()
export class UserService extends CrudApiService<Model.Org.IUser> {
    GetByBranch(branch_id: string[]) {
        return this.api.Search({ branch_id: branch_id.join(',') });
    }

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
