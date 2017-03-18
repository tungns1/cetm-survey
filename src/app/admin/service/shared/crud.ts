import { Injectable } from '@angular/core';
import { AdminFilterService, AdminFilter } from './filter';
import { AdminNavService } from './nav';
import { Observable } from 'rxjs/Observable';
import { HttpApi } from '../../../shared/service/backend'
import { CacheBranch } from '../../../shared/model';

export interface IField {
    name: string;
    title: string;
}

export class CrudApiService<T> {
    constructor(private uri: string,
        private filterService: AdminFilterService
    ) {
        this.api = new HttpApi<T>(uri);
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
    protected api: HttpApi<T>;
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
        { title: 'LANGAUGE_SUB_BRANCH', name: 'branch' },
        { title: 'LANGAUGE_NAME', name: 'name' }
    ]
}