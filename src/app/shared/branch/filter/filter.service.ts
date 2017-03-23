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
        for (let i = 0; i <= this.max; i++) {
            this.levels.push(i);
        }
    }

    get Levels() {
        return this.Levels;
    }

    get Max() {
        return this.max;
    }

    get branches() {
        return this.data.branches;
    }

    getLowestLevel() {
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
        return this.branches[this.getLowestLevel()];
    }

    getByLevel(i: number) {
        return this.branches[i];
    }

    setByLevel(i: number, s: string[]) {
        this.branches[i] = s;
        this.emitChange();
    }

    getAllID() {
        return this.branches.reduce((res, ids) => res.concat(ids), []);
    }

    triggerChange() {
        this.emitChange();
    }

    private levels: number[] = [];
    private max: number;

    private checkTheRoot() {
        const maxLevel = this.max;
        const branchAtRoot = CacheBranch.GetByLevel(maxLevel);
        this.setByLevel(maxLevel, branchAtRoot.map(b => b.id));
    }
}