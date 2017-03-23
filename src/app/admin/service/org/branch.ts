
import { Injectable } from '@angular/core';
import { AuthService, HttpServiceGenerator, BranchFilterService } from '../../shared/';
import { 
    CrudApiService, IBranch, CacheBranch 
} from '../shared';

@Injectable()
export class BranchService extends CrudApiService<IBranch> {
    constructor(
        hsg: HttpServiceGenerator,
        filterService: BranchFilterService,
        private authService: AuthService
    ) {
        super("/api/admin/org/branch", hsg, filterService);
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

    protected filter() {
        const parents = this.filterService.getByLevel(this.level + 1);
        return this.authService.RefreshMySettings().switchMap(() => {
            return this.GetListViewByLevelAndParents(parents, this.level);
        });
    }

    SetLevel(level: number) {
        this.level = level;
    }

    private level = 2;
}