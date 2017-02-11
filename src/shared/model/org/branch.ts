import { Cache } from '../../shared/';

export interface IBranch extends Cache.ID {
    code?: string;
    name?: string;

    parent?: string;
    level?: number;

    _checked?: boolean;
    _shown?: boolean;
    parent_name?: string;
}

export const BranchLevels = [
    { name: 'LABEL_SUB_BRANCH', value: 0 },
    { name: 'LABEL_BRANCH', value: 1 },
    { name: 'AREA', value: 2 },
    { name: 'LABEL_ROOT', value: 3 }
]

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
class BranchCache extends Cache.MemCache<IBranch> {
    RxByLevel(level: number) {
        return this.RxListView.map(branches =>
            branches.filter(b => b.level === level)
        );
    }

    GetByLevel(level: number) {
        return this.RxListView.value.filter(b => b.level === level);
    }

    RxMax = new BehaviorSubject<IBranch>(null);

    GetMaxLevel() {
        return this.RxMax.value ? this.RxMax.value.level : 0;
    }

}

interface IModel { branch_id?: string, branch?: string };
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

export function AddBranchName<T extends IModel>(src: Observable<T[]>) {
    return src.do(models => {
        models.forEach(v => v.branch = CacheBranch.GetByID(v.branch_id).name || 'n/a');
    });
}

export const CacheBranch = new BranchCache();