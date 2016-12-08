// import { StartDate, EndDate } from '../shared/date-filter.component';
// import { SelectedBranchIDLevel0 } from '../../../o/branch/branch.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { ServiceCode, UserID, CounterID } from '../shared/branch-details.component';
import { IAggregate, RxAggregate, AggregateView } from './aggregate.model';
import { Backend } from '../shared/';

const backendReport = new Backend.HttpApi<any>("/api/report/transaction");
import { RxGroupBy, RxFilter, IFilter, NameMap } from '../filter/filter.module';

export function RefreshAggregate(filter: IFilter) {
    let res = backendReport.Get<IAggregate[]>("aggregate", filter).do(v => RxAggregate.next(v));
    res.subscribe();
}

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export * from './aggregate.model';

export const RxSummaryView = RxAggregate.map(AggregateView.Make);

function MakeIndexBy(records: IAggregate[], field: string) {
    let res: { [index: string]: AggregateView } = {};
    records.forEach(v => {
        let fieldValue = v[field];
        if (res[fieldValue] == null) {
            res[fieldValue] = new AggregateView();
        }
        res[fieldValue].Add(v);
    })
    let values = Object.keys(res).map(k => res[k]);
    return values;
}

export const RxAggregateByTime = RxAggregate.map(records => {
    const views = MakeIndexBy(records, 'time');
    views.sort((a, b) => a.time > b.time ? 1 : 0);
    return views;
});

export const RxActiveAggregate = Observable.combineLatest(RxAggregate, RxGroupBy).map(view => {
    const group_by = view[1];
    const views = MakeIndexBy(view[0], view[1]);
    views.forEach(v => {
        v.name = NameMap.get(v[group_by]) || 'n/a';
        v.Finalize();
    })
    return views;
});





