import { Injectable } from '@angular/core';
import { BranchCrudApiService, IUser, CacheBranch } from '../shared';
import { HttpServiceGenerator, BranchFilterService } from '../../shared';

@Injectable()
export class UserService extends BranchCrudApiService<IUser> {
    constructor(
        hsg: HttpServiceGenerator,
        filterService: BranchFilterService,
    ) {
        super("/api/admin/org/user", hsg, filterService);
    }

    protected filter() {
        return this.GetByBranch(this.filterService.getLowestBranches())
            .do(data => CacheBranch.Join(data));
    }
}
