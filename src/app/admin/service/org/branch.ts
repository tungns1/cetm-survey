
import { Injectable } from '@angular/core';
import { AuthService, HttpApi } from '../../shared/';
import { 
    CrudApiService, IBranch, CacheBranch, AdminNavService,
    BranchFilterService
 } from '../shared';

@Injectable()
export class BranchService extends CrudApiService<IBranch> {
    constructor(
        nav: AdminNavService,
        api: HttpApi<IBranch>,
        private branchFilter: BranchFilterService,
        private authService: AuthService
    ) {
        super(nav, api);
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

    protected filter() {
        const parents = this.branchFilter.getByLevel(this.level + 1);
        return this.authService.RefreshMySettings().switchMap(() => {
            return this.GetListViewByLevelAndParents(parents, this.level);
        });
    }

    SetLevel(level: number) {
        this.level = level;
    }

    private level = 2;
}