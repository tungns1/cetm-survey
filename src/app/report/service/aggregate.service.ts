import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAggregate, Aggregate } from '../model';

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

            let ids = this.filterService.Current.GetActiveID();

            views.forEach(v => {
                const id = v[group_by];
                v.name = this.GetName(id, group_by);
                v.Finalize();
                const i = ids.indexOf(id);
                // remove from ids 
                if (i != -1) {
                    ids.splice(i, 1)
                }
            });

            ids.forEach(id => {
                let v = new Aggregate();
                v.name = this.GetName(id, group_by);
                views.push(v);
            });

            return views;
        });
    }

    GetName(id: string, model: string) {
        switch (model) {
            case 'service_id':
                return Model.Center.ServiceName(id);
            case 'branch_id':
                return Model.Org.CacheBranch.GetNameForID(id);
            case 'user_id':
                return Model.Org.CacheUsers.GetName(id, 'fullname');
            case 'counter_id':
                return Model.House.CacheCounter.GetName(id, 'name');
        }
        return Model.House.CacheCounter.NotApplicable;
    }

    groupBy$ = new BehaviorSubject<string>('branch_id');
    period$ = new BehaviorSubject<string>('day');

    backend = new SharedService.Backend.HttpApi<any>("/api/report/transaction");
}


