
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

    protected filter() {
        return this.authService.RefreshMySettings().switchMap(_ => {
            return CacheBranch.RxListView;
        });
    }
}