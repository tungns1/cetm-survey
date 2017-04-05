import { Injectable } from '@angular/core';
import { BranchFilterService } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { HttpApi, HttpServiceGenerator } from '../../shared';
import { CacheBranch } from '../../../shared/model';
import { AdminNavService } from './nav';
import { ReplaySubject } from 'rxjs/ReplaySubject';

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
        return this.api.Post("create", {}, v).do(this.onChange);
    }

    Update(v: T) {
        return this.api.Post("update", {id: v['id']}, v).do(this.onChange);
    }

    UpdateByID(id: string, v: T) {
        return this.api.Post("update", {id: id}, v).do(this.onChange);
    }

    GetByID(id: string) {
        return this.api.Get<T>("get", { id: id });
    }

    MarkDelete(id: string) {
        return this.api.Post("mark_delete", {id: id}).do(this.onChange);
    }
    
    Search(o) {
        return this.api.Get<T[]>('search', o);
    }

    private onChange = () => {
        this.nav.Refresh();
    }

    get RxListView() {
        return this.nav.Refresh$.switchMap(v => this.filter());
    }
}

interface IBranchModel {
    branch_id: string;
}

@Injectable()
export class BranchCrudApiService<T extends IBranchModel> extends CrudApiService<T> {
    constructor(
        nav: AdminNavService,
        api: HttpApi<T>,
        protected branchFilter: BranchFilterService
    ) {
        super(nav, api);
    }

    protected filter() {
        let branches = this.branchFilter.getAllID();
        return this.GetByBranch(branches).map(data => {
            CacheBranch.Join(data);
            const ids = this.branchFilter.getLowestBranches();
            const upper = data.filter(d => ids.indexOf(d['branch_id']) === -1);
            this.RxUpperList.next(upper);
            return data.filter(d => ids.indexOf(d['branch_id']) !== -1);
        });
    }

    GetByBranch(branch_id: string[]) {
        return this.Search({ branch_id: branch_id.join(',') });
    }

    RxUpperList = new ReplaySubject<T[]>(1);
}

@Injectable()
export class BranchCrudApiServiceGenerator {
    constructor(
        private nav: AdminNavService,
        private hsg: HttpServiceGenerator,
        protected branchFilter: BranchFilterService
    ) {

    }

    make<T extends IBranchModel>(uri: string) {
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