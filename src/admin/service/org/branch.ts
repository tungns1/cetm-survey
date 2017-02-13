
import { Injectable } from '@angular/core';
import { Model, Branch, SharedService } from '../../shared/';
import { CrudApiService, AdminFilter, AdminFilterService } from '../shared';

const Cache = Model.Org.CacheBranch;

@Injectable()
export class BranchService extends CrudApiService<Model.Org.IBranch> {
    constructor(
        uri: string,
        filterService: AdminFilterService,
        private authService: SharedService.Auth.AuthService
    ) {
        super(uri, filterService);
    }

    GetByBranch(branch_id: string[]) {
        return this.api.Search({ branch_id: branch_id.join(',') });
    }

    GetListViewByLevel(level: number) {
        return Cache.RxByLevel(level);
    }

    GetListViewByLevelAndParents(parents: string[], level: number) {
        return this.GetListViewByLevel(this.level).map(data => {
            if (!parents) {
                return data;
            }
            data.forEach(d => {
                d.parent_name = Cache.GetNameForID(d.parent);
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
        { title: "LABEL_NAME_ADDRESS_FATHER", name: "parent_name" },
        { title: "LABEL_NAME_ADDRESS", name: "name" },
        { title: "LABEL_CODE", name: "code" }
    ]

    Name = "LABEL_USER";

    private level = 2;
}