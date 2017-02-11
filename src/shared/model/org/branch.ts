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

class BranchCache extends Cache.MemCache<IBranch> {
    Refresh(arr: IBranch[]) {
        super.Refresh(arr);
    }
}

export const CacheBranch = new BranchCache();