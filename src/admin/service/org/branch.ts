
import { Injectable } from '@angular/core';
import { Model, Branch, SharedService } from '../../shared/';
import { CrudApiService, AdminFilter, FilterService } from '../shared';

const Cache = Model.Org.CacheBranch;

@Injectable()
export class BranchService extends CrudApiService<Model.Org.IUser> {
    constructor(
        uri: string,
        filterService: FilterService,
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

    protected filter(d: AdminFilter) {
        return this.GetListViewByLevel(this.level).map(data => {
            const parents = d.GetBranchID()[this.level + 1];
            if (!parents) {
                return data;
            }
            return data.filter(d => parents.indexOf(d.parent) !== -1);
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


export const Levels = [
    { name: 'LABEL_HEAD', value: 3 },
    { name: 'CITY', value: 2 },
    { name: 'LABEL_BRANCH', value: 1 },
    { name: 'LABAEL_TRACTION_ROOM', value: 0 }
]