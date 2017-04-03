import { Injectable } from '@angular/core';
import { BranchLevels, AbstractState, CacheBranch, AbstractStateService, MultipleIDList } from '../../model';


interface IBranchFilter {
    branches: string[][];
}

import {
    SmallStorage,
    RouterQueryStorageStrategy
} from '../../shared';

@Injectable()
export class BranchFilterService extends SmallStorage<IBranchFilter> {
    constructor(
        private storageStrategy: RouterQueryStorageStrategy
    ) {
        super("branches", storageStrategy);
        this.levels = [];
        this.max = BranchLevels.length - 1;
        let branches = this.data.branches || [];
        for (let i = 0; i <= this.max; i++) {
            this.levels.push(i);
            branches[i] = branches[i] || [];
        }
        this.data.branches = branches;
        this.checkTheRoot();
    }

    get branches() {
        return this.data.branches || [];
    }

    Setbranches(ids: string[][]) {
        let branches = this.branches || [];
        for (let i = 0; i <= this.max; i++) {
            branches[i] = ids[i] || [];
        }
        this.data.branches = branches;
        this.SaveData(true);
    }

    private getLowestLevel() {
        let i = 0;
        while (i <= this.max) {
            if (this.branches[i] && this.branches[i].length > 0) {
                return i;
            }
            i++;
        }
        return this.max;
    }

    getLowestBranches() {
        return this.getByLevel(this.getLowestLevel());
    }

    getByLevel(i: number) {
        return this.branches[i] || [];
    }

    getAllID() {
        return this.branches.reduce((res, ids) => res.concat(ids), []);
    }

    triggerChange() {
        // this.emitChange();
    }

    levels: number[] = [];

    level0$ = this.Data$.map(d => d.branches[0]);

    private max: number;

    private checkTheRoot() {
        const maxLevel = this.max;
        const branchAtRoot = CacheBranch.GetByLevel(maxLevel);
        this.branches[maxLevel] = branchAtRoot.map(b => b.id);
        this.SaveData(true);
    }
}