import { Injectable } from '@angular/core';
import { BranchFilterService } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { HttpApi, HttpServiceGenerator } from '../../shared';
import { CacheBranch } from '../../../shared/model';

export interface IField {
    name: string;
    title: string;
}

export class CrudApiService<T> {
    constructor(
        protected uri: string,
        protected hsg: HttpServiceGenerator,
        protected filterService: BranchFilterService
    ) {

    }

    protected api = this.hsg.make(this.uri);

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

    protected onChange = () => {
        this.filterService.triggerChange();
    }

    get RxListView() {
        return this.filterService.Data$.switchMap(v => this.filter());
    }
}

export class BranchCrudApiService<T> extends CrudApiService<T> {
    GetByBranch(branch_id: string[]) {
        return this.api.Search({ branch_id: branch_id.join(',') });
    }

    protected filter() {
        let branches = this.filterService.getLowestBranches();
        return this.GetByBranch(branches).do(data => CacheBranch.Join(data));
    }
}
