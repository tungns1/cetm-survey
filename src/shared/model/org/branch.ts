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
    { name: 'LABEL_ROOT', value: 3 },
    { name: 'AREA', value: 2 },
    { name: 'LABEL_BRANCH', value: 1 },
    { name: 'LABEL_SUB_BRANCH', value: 0 }
]


export const Levels = [
    'LABEL_SUB_BRANCH',
    'LABEL_BRANCH',
    'AREA',
    'LABEL_ROOT'
]

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
class BranchCache extends Cache.MemCache<IBranch> {
    Refresh(branches: IBranch[], maxBranchID?: string) {
        let branch = branches.find(b => b.id === maxBranchID);
        const maxLevel = branch ? branch.level : 0;
        branches.forEach(b => this.mapView.set(b.id, b));
        branches.forEach(b => {
            let p = this.mapView.get(b.id);
            b.parent_name = (p && p.name) ? p.name : 'n/a';
        });
        branches = branches.filter(b => b.level < maxLevel);
        branches.push(branch);
        this.RxListView.next(branches);
        this.RxMax.next(branch);
    }

    RxMax = new BehaviorSubject<IBranch>(null);

    GetMaxLevel() {
        return this.RxMax.value? this.RxMax.value.level : 0;
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