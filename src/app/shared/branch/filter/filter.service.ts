import { Injectable } from '@angular/core';
import { CacheBranch, MultipleIDList, USER_ROLES, IBranch } from '../../model';
import { RuntimeEnvironment } from '../../env'

interface IBranchFilter {
    branches: string[][];
}

import {
    SmallStorage,
    RouterQueryStorageStrategy
} from '../../shared';
import { Subject, BehaviorSubject } from 'rxjs';
import { TransactionHistoryApi } from '../../../report/history/shared';
import { map } from 'rxjs/operators';

@Injectable()
export class BranchFilterService extends SmallStorage<IBranchFilter> {
    constructor(
        private storageStrategy: RouterQueryStorageStrategy,
        private env: RuntimeEnvironment
    ) {
        super("branches", storageStrategy);
        this.levels = [];
        this.max = CacheBranch.MaxLevel();
        let branches = this.data.branches || [];
        for (let i = 0; i <= this.max; i++) {
            this.levels.push(i);
            branches[i] = branches[i] || [];
        }
        this.data.branches = branches;
        this.checkTheRoot();

        // this.env.Auth.User$
        //     .map(u => u.role.indexOf(USER_ROLES.ADMIN_STANDARD) !== -1)
        //     .subscribe(d => {
        //         if (d)
        //             CacheBranch.RxListView.subscribe(branches => {
        //                 branches.forEach((b, i) => {
        //                     this.data.branches[i][0] = b.id
        //                 })
        //             })
        //     });

    }
    private test = new BehaviorSubject<IBranch[]>([]);
    test1 = this.test.asObservable();
    levels: number[] = [];

    level0$ = this.Data$.pipe(map(d => d.branches[0]));

    private max: number;

    // isAdminStandard: boolean = false;
    getTestValue(data:IBranch[]){
        this.test.next(data)
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

    private checkTheRoot() {
        const maxLevel = this.max;
        const branchAtRoot = CacheBranch.GetByLevel(maxLevel);
        this.branches[maxLevel] = branchAtRoot.map(b => b.id);
        // this.SaveData(true);
    }
}