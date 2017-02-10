import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { RxGroupBy, RxPeriod, FilterService } from '../../service/';
import { Branch, SharedConfig, Model } from '../../shared/';
import { Store } from '@ngrx/store';
import { IAppState, ACTION } from '../../reducers';
import { ReportFilter, IFocus } from '../../model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})
export class ReportFilterComponent {
    constructor(
        private filterService: FilterService,
        private store: Store<IAppState>
    ) { }

    form = (new FormBuilder()).group({
        start: [],
        end: [],
        period: [],
        service_id: [[]],
        counter_id: [[]],
        user_id: [[]]
    });

    counters$: Observable<Model.House.ICounter[]>;
    services$: Observable<Model.Center.IService[]>;
    users$: Observable<Model.Org.IUser[]>;

    ngOnInit() {
        this.store.select<ReportFilter>('filter').subscribe(filter => {
            this.form.setValue(filter.GetValueWithBranch());
            this.form.updateValueAndValidity();
        });
        const focus = this.store.select<IFocus>('focus');
        this.counters$ = focus.map(d => d.counters);
        this.services$ = focus.map(d => d.services);
        this.users$ = focus.map(d => d.users);
    }

    refresh() {
        this.store.dispatch({ type: ACTION.FILTER_INIT, payload: this.form.value });
        this.filterService.Refresh();
        // RxGroupBy.next(filter.group_by);
        // RxPeriod.next(filter.period);
    }
}