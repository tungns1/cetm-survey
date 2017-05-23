import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAggregate, Aggregate, MakeIndexBy } from './aggregate';

import { ReportFilterService, PeriodFilterService, InsideBranchFilterService } from '../../shared';

import {
    HttpServiceGenerator, ServiceName, CacheBranch, CacheCounter, CacheUsers
} from '../../../shared';
import { Injectable } from '@angular/core';

@Injectable()
export class AggregateService {
    constructor(
        private filterService: ReportFilterService,
        private periodService: PeriodFilterService,
        private insideService: InsideBranchFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    Refresh() {
        this.backend.Get<IAggregate[]>("aggregate", this.filterService.ToBackendQuery()).subscribe(data => {
            this.RxAggregate.next(data);
        });
        this.period$.next(this.periodService.Data.period);
        this.groupBy$.next(this.insideService.GetGroupBy());
    }

    RxAggregate = new BehaviorSubject<IAggregate[]>([]);

    get RxSummaryView() {
        return this.RxAggregate.map(Aggregate.Make);
    };

    get ActiveAggregate$() {
        return this.RxAggregate.map(v => {
            const group_by = this.insideService.GetGroupBy();
            const views = MakeIndexBy(v, group_by);

            let ids = this.filterService.GetActiveID();

            views.forEach(v => {
                const id = v[group_by];
                v.Finalize();
                const i = ids.indexOf(id);
                // remove from ids 
                if (i != -1) {
                    ids.splice(i, 1)
                }
            });

            ids.forEach(id => {
                let v = new Aggregate();
                v[group_by] = id;
                views.push(v);
            });

            return views;
        });
    }

    groupBy$ = new BehaviorSubject<string>('branch_id');
    period$ = new BehaviorSubject<string>('day');

    backend = this.httpServiceGenerator.make<any>("/api/report/transaction");
}


