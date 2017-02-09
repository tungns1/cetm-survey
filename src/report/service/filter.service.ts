import { Model, Branch } from '../shared/';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FocusBranchService } from './focus.service';

import { Store } from '@ngrx/store';
import { IAppState, ACTION } from '../reducers';
import { ReportFilter } from '../model';

export const RxGroupBy = new BehaviorSubject<string>('branch_id');
export const RxPeriod = new BehaviorSubject<string>('day');

const Titles = {
    branch_id: "TRANSACTION_ROOM",
    service_id: 'SERVICE',
    counter_id: 'COUNTER',
    user_id: 'TELLERS'
}

export const RxGroupTitle = RxGroupBy.map(group => Titles[group]);

import { SharedConfig } from '../shared';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Injectable } from '@angular/core';

// All navigation must be done via the FilterService
@Injectable()
export class FilterService {
    constructor(
        private focusService: FocusBranchService,
        private store: Store<IAppState>,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.onInit();
    }

    Refresh() {
        // this.activeRes(filter);
        this.store.select<ReportFilter>('filter').first().subscribe((v) => {
            console.log(v);
            this.router.navigate(['dashboard'], {
                queryParams: v.ToQuery()
            });
        });
    }

    private onInit() {
        Branch.SelectedBranchIDLevel0.subscribe(id => {
            this.store.dispatch({ type: ACTION.FILTER_BRANCH, payload: id })
        });

        const p = this.route.snapshot.queryParams;
        this.store.dispatch({ type: ACTION.FILTER_INIT, payload: p });
        this.Refresh();
    }

}
