
import { Injectable } from '@angular/core';
import { AuthService, HttpApi } from '../../shared/';
import { CrudApiService, AdminFilter, AdminFilterService, IBranch, CacheBranch } from '../shared';

@Injectable()
export class BranchService extends CrudApiService<IBranch> {
    constructor(
        api: HttpApi<IBranch> ,
        filterService: AdminFilterService,
        private authService: AuthService
    ) {
        super(api, filterService);
    }

    GetByBranch(branch_id: string[]) {
        return this.api.Search({ branch_id: branch_id.join(',') });
    }

    GetListViewByLevel(level: number) {
        return CacheBranch.RxByLevel(level);
    }

    GetListViewByLevelAndParents(parents: string[], level: number) {
        return this.GetListViewByLevel(this.level).map(data => {
            if (!parents) {
                return data;
            }
            data.forEach(d => {
                d.parent_name = CacheBranch.GetNameForID(d.parent);
            })
            return data.filter(d => parents.indexOf(d.parent) !== -1);
        });
    }

    protected filter(d: AdminFilter) {
        const parents = d.Branch.GetBranchIDByLevel(this.level + 1);
        return this.authService.RefreshMySettings().switchMap(() => {
            return this.GetListViewByLevelAndParents(parents, this.level);
        });
    }

    SetLevel(level: number) {
        this.level = level;
    }

    ListFields = [
        { title: "Parent address", name: "parent_name" },
        { title: "Address", name: "name" },
        { title: "Code", name: "code" }
    ]

    Name = "User";

    private level = 2;
}