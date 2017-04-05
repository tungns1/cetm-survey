
import { Injectable } from '@angular/core';
import { AuthService, HttpApi } from '../../shared/';
import {
    CrudApiService, IBranch, CacheBranch, AdminNavService,
    BranchFilterService
} from '../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Injectable()
export class BranchService extends CrudApiService<IBranch> {
    constructor(
        nav: AdminNavService,
        api: HttpApi<IBranch>,
        private branchFilter: BranchFilterService,
        private authService: AuthService
    ) {
        super(nav, api);
    }

    Create(v: IBranch) {
        return this.Level$.switchMap(level => {
            v.level = level;
            return super.Create(v);
        });
    }

    protected filter() {
        return this.authService.RefreshMySettings().switchMap(() => {
            return this.Level$.switchMap(level => {
                const parents = this.branchFilter.getByLevel(level + 1);
                return CacheBranch.RxByLevel(level).map(branches => {
                    branches.forEach(b => {
                        b.parent_name = CacheBranch.GetNameForID(b.parent)
                    })
                    return branches.filter(b => parents.indexOf(b.parent) !== -1);
                });
            })
        });
    }

    SetLevel(level: number) {
        this.Level$.next(level);
    }


    Level$ = new ReplaySubject<number>(1);
    RxUpplerList = this.Level$.switchMap(level => {
        const ids = this.branchFilter.getAllID();
        return CacheBranch.RxByLevel(level + 1).map(branches => {
            return branches.filter(b => ids.indexOf(b.id) !== -1);
        });
    });
}