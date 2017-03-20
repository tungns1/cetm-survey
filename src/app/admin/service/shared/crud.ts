import { Injectable } from '@angular/core';
import { AdminFilterService, AdminFilter } from './filter';
import { AdminNavService } from './nav';
import { Observable } from 'rxjs/Observable';
import { HttpApi } from '../../shared';
import { CacheBranch } from '../../../shared/model';

export interface IField {
    name: string;
    title: string;
}

export class CrudApiService<T> {
    constructor(
        protected api: HttpApi<T>,
        private filterService: AdminFilterService
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

    protected filter(d: AdminFilter): Observable<T[]> {
        return Observable.of([]);
    }

    protected onChange = () => {
        this.filterService.triggerChange();
    }

    get RxListView() {
        return this.filterService.ValueChanges.switchMap(v => this.filter(v));
    }

    Name: string;
    ListFields: IField[] = [];
}

export class BranchCrudApiService<T> extends CrudApiService<T> {
    GetByBranch(branch_id: string[]) {
        return this.api.Search({ branch_id: branch_id.join(',') });
    }

    protected filter(d: AdminFilter) {
        return this.GetByBranch(d.Branch.GetBranchIDAtLowestLevel())
            .do(data => CacheBranch.Join(data));
    }

    ListFields = [
        { title: 'Agency', name: 'branch' },
        { title: 'Name', name: 'name' }
    ]
}