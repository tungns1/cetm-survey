import { Injectable } from '@angular/core';
import { BranchFilterService } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { HttpApi, HttpServiceGenerator } from '../../shared';
import { CacheBranch } from '../../../shared/model';
import { AdminNavService } from './nav';

export class CrudApiService<T> {
    constructor(
        protected nav: AdminNavService,
        protected api: HttpApi<T>
    ) {

    }

    protected filter() {
        return Observable.of<T[]>();
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

    private onChange = () => {
        this.nav.Refresh();
    }

    get RxListView() {
        return this.nav.Refresh$.switchMap(v => this.filter());
    }
}

@Injectable()
export class BranchCrudApiService<T> extends CrudApiService<T> {
    constructor(
        nav: AdminNavService,
        api: HttpApi<T>,
        protected branchFilter: BranchFilterService
    ) {
        super(nav, api);
    }

    protected filter() {
        let branches = this.branchFilter.getLowestBranches();
        return this.GetByBranch(branches).do(data => CacheBranch.Join(data));
    }

    GetByBranch(branch_id: string[]) {
        return this.api.Search({ branch_id: branch_id.join(',') });
    }
}

@Injectable()
export class BranchCrudApiServiceGenerator {
    constructor(
        private nav: AdminNavService,
        private hsg: HttpServiceGenerator,
        protected branchFilter: BranchFilterService
    ) {

    }

    make<T>(uri: string) {
        return new BranchCrudApiService<T>(
            this.nav,
            this.hsg.make<T>(uri),
            this.branchFilter
        );
    }
}

@Injectable()
export class CrudApiServiceGenerator {
    constructor(
        private nav: AdminNavService,
        private hsg: HttpServiceGenerator
    ) {

    }

    make<T>(uri: string) {
        return new CrudApiService<T>(
            this.nav,
            this.hsg.make<T>(uri)
        );
    }
}