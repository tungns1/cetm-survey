import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAggregate, Aggregate, } from '../model';
import { SharedService } from '../shared/';

export function MakeIndexBy(records: IAggregate[], field: string) {
    let res: { [index: string]: Aggregate } = {};
    records.forEach(v => {
        let fieldValue = v[field];
        if (res[fieldValue] == null) {
            res[fieldValue] = new Aggregate();
        }
        res[fieldValue].Add(v);
    })
    let values = Object.keys(res).map(k => res[k]);
    return values;
}

import { ReportFilterService, ReportFilter } from './shared';

import { Injectable } from '@angular/core';

@Injectable()
export class AggregateService {
    constructor(
        private filterService: ReportFilterService
    ) { }

    Refresh(v: ReportFilter) {
        this.backend.Get<IAggregate[]>("aggregate", v.ToBackendQuery()).subscribe(data => {
            this.RxAggregate.next(data);
        });
        this.period$.next(v.Period.valueOf().period);
        this.groupBy$.next(v.Inside.GetGroupBy());
    }

    RxAggregate = new BehaviorSubject<IAggregate[]>([]);

    get RxSummaryView() {
        return this.RxAggregate.map(Aggregate.Make);
    };

    get ActiveAggregate$() {
        return this.RxAggregate.map(v => {
            const group_by = this.filterService.Current.Inside.GetGroupBy();
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
                let v = new Aggregate();
                // v.name = NameMap.get(id) || 'n/a';
                views.push(v);
            });

            return views;
        });
    }

    groupBy$ = new BehaviorSubject<string>('branch_id');
    period$ = new BehaviorSubject<string>('day');

    backend = new SharedService.Backend.HttpApi<any>("/api/report/transaction");
}


