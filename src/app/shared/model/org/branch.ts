import { ID, MemCache } from '../../shared/';

export interface IBranch extends ID {
    code?: string;
    name?: string;

    parent?: string;
    level?: number;

    _checked?: boolean;
    _shown?: boolean;
    parent_name?: string;
}

export const BranchLevels = [
    { 
        name: 'STORE', 
        value: 0,
        vi: 'Phòng Giao Dịch'
    },
    { 
        name: 'BRANCH', 
        value: 1,
        vi: 'Chi Nhánh'
    },
    { 
        name: 'AREA', 
        value: 2,
        vi: 'Tỉnh/Thành'
    },
    { 
        name: 'COUNTRY', 
        value: 3,
        vi: 'Quốc Gia'
     }
]

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
class BranchCache extends MemCache<IBranch> {
    RxByLevel(level: number) {
        return this.RxListView.map(branches =>
            branches.filter(b => b.level === level)
        );
    }
    MaxLevel() {
        var max=0;
        var branches=this.RxListView.getValue();
        for(var i=0;i<branches.length;i++){
            if(max<branches[i].level){
                max=branches[i].level;
            }
        }
        return max;
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
    GetForID(id: string) {
        return this.GetByID(id);
    }
    GetCodeForID(id: string) {
        const b = this.GetByID(id);
        return b ? b.code : this.NotApplicable;
    }

    Join(arr: any[]) {
        return super.Join(arr, 'name', { from: 'branch_id', to: 'branch' });
    }
}

export const CacheBranch = new BranchCache();
