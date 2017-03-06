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
    { name: 'LANGAUGE_SUB_BRANCH', value: 0 },
    { name: 'LANGAUGE_BRANCH', value: 1 },
    { name: 'LANGAUGE_AREA', value: 2 },
    { name: 'LANGAUGE_COUNTRY', value: 3 }
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

    GetNameForID(id: string) {
        const b = this.GetByID(id);
        return b ? b.name : this.NotApplicable;
    }

    Join(arr: any[]) {
        return super.Join(arr, 'name', { from: 'branch_id', to: 'branch' });
    }
}

export const CacheBranch = new BranchCache();
