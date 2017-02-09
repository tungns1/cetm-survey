import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxAggregate = new BehaviorSubject<IAggregate[]>([]);
import { IAggregate, AggregateView, IFilter } from '../model';
import { SharedService } from '../shared/';

const backendReport = new SharedService.Backend.HttpApi<any>("/api/report/transaction");

import { RxGroupBy, RxPeriod } from './filter.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export const RxSummaryView = RxAggregate.map(AggregateView.Make);

export function MakeIndexBy(records: IAggregate[], field: string) {
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

export const RxActiveAggregate = RxAggregate.map(v => {
    const group_by = RxGroupBy.value;
    const views = MakeIndexBy(v, group_by);

    let ids: string[] = [];
    if (group_by === 'branch_id') {
        // ids = GetBranch();
    } else if (group_by === 'service_id') {
        // ids = GetServices();
    } else if (group_by === 'counter_id') {
        // ids = GetCounters();
    } else if (group_by === 'user_id') {
        // ids = GetUsers();
    }

    views.forEach(v => {
        // v.name = NameMap.get(v[group_by]) || 'n/a';
        v.Finalize();

        if (ids.indexOf(v[group_by]) != -1) {
            ids.splice(ids.indexOf(v[group_by]), 1)
        }
    })

    ids.forEach(id => {
        let v = new AggregateView();
        // v.name = NameMap.get(id) || 'n/a';
        views.push(v);
    });

    return views;
});

export class AggregateService {
    Refresh(filter: IFilter) {
        if (filter.branch_id === 'all') {
            filter.branch_id = '';
        }
        let res = backendReport.Get<IAggregate[]>("aggregate", filter).do(v => RxAggregate.next(v));
        res.subscribe();
    }
}


