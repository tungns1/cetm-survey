import { Injectable } from '@angular/core';
import { BranchFilterService } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { HttpApi, HttpServiceGenerator } from '../../shared';
import { CacheBranch } from '../../../shared/model';
import { AdminNavService } from './nav';

export class CrudApiService<T> {
    constructor(
        private nav: AdminNavService,
        protected api: HttpApi<T>
    ) {

    }

    Create(v: T) {
        return this.api.Create(v).do(this.onChange);
    }

    Update(v: T) {
        return this.api.Update(v).do(this.onChange);
    }

    MarkDelete(id: string) {
        return this.api.MarkDelete(id).do(this.onChange);
    }

    protected filter(): Observable<T[]> {
        return Observable.of([]);
    }

    private onChange = () => {
        this.nav.Refresh$.next(null);
    }

    get RxListView() {
        return this.nav.Refresh$.switchMap(v => this.filter());
    }
}

export class BranchCrudApiService<T> extends CrudApiService<T> {
    constructor(
        nav: AdminNavService,
        api: HttpApi<T>,
        protected branchFilter: BranchFilterService
    ) {
        super(nav, api);
    }

    GetByBranch(branch_id: string[]) {
        return this.api.Search({ branch_id: branch_id.join(',') });
    }

    protected filter() {
        let branches = this.branchFilter.getLowestBranches();
        return this.GetByBranch(branches).do(data => CacheBranch.Join(data));
    }
}
