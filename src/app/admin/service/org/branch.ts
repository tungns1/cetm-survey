
import { Injectable } from '@angular/core';
import { SharedService, AuthService } from '../../shared/';
import { CrudApiService, AdminFilter, AdminFilterService, IBranch, CacheBranch } from '../shared';

@Injectable()
export class BranchService extends CrudApiService<IBranch> {
    constructor(
        uri: string,
        filterService: AdminFilterService,
        private authService: AuthService
    ) {
        super(uri, filterService);
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
        { title: "LANGAUGE_NAME_ADDRESS_FATHER", name: "parent_name" },
        { title: "LANGAUGE_NAME_ADDRESS", name: "name" },
        { title: "LANGAUGE_CODE", name: "code" }
    ]

    Name = "LANGAUGE_USER";

    private level = 2;
}