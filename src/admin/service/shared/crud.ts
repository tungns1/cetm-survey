import { SharedService, Model } from '../../shared';
import { Injectable } from '@angular/core';
import { AdminFilterService, AdminFilter } from './filter';
import { Observable } from 'rxjs/Observable';

export interface IField {
    name: string;
    title: string;
}

export class CrudApiService<T> {
    constructor(private uri: string, private filterService: AdminFilterService) {
        this.api = new SharedService.Backend.HttpApi<T>(uri);
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
        this.filterService.Refresh();
    }

    get RxListView() {
        return this.filterService.ValueChanges.switchMap(v => this.filter(v));
    }

    Name: string;
    ListFields: IField[] = [];
    protected api: SharedService.Backend.HttpApi<T>;
}

export class BranchCrudApiService<T> extends CrudApiService<T> {
    GetByBranch(branch_id: string[]) {
        return this.api.Search({ branch_id: branch_id.join(',') });
    }

    protected filter(d: AdminFilter) {
        return this.GetByBranch(d.Branch.GetBranchIDAtLowestLevel())
            .do(data => Model.Org.CacheBranch.Join(data));
    }

    ListFields = [
        { title: 'LABEL_SUB_BRANCH', name: 'branch' },
        { title: 'LABEL_NAME', name: 'name' }
    ]
}