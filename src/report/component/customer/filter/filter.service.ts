import { ITransaction, ITransactionView } from '../../shared';
import { SharedService, Model } from '../../shared/';
import { ReportFilterService, ReportFilter } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { IAggregate, Aggregate, } from '../../../model';


export const data$ = new BehaviorSubject<ITransactionView[]>([]);
export const RxAggregate = new BehaviorSubject<IAggregate[]>([]);
export interface IHistory {
    data: ITransaction[];
    total: number;
}

@Injectable()
export class CustomerAPI {
    constructor(
        private filterService: ReportFilterService
    ) { }

    Search_History(filter: ReportFilter, id: string) {
        this.api.Get<IHistory>("customer_history", this.makeQueryHistory(filter, id)).subscribe(v => {
            data$.next(v.data.map(d => this.toTransactionView(d)));
            this.count$.next(v.total);
        });
    }
    Search_Agg(v: ReportFilter, id: string) {
        this.api.Get<IAggregate[]>("customer_agg", this.makeQueryAgg(v, id)).subscribe(data => {
            RxAggregate.next(data);
        });
    }


    private makeQueryHistory(filter: ReportFilter, id: string) {
        return Object.assign({
            skip: (this.currentPage$.value - 1) * this.pageSize$.value,
            limit: this.pageSize$.value,
            id: id
        }, filter.ToBackendQuery());
    }
    private makeQueryAgg(filter: ReportFilter, id: string) {
        return Object.assign({
            id: id,
        }, filter.ToBackendQueryCustomer());
    }

    private toTransactionView(t: ITransaction) {
        var res = <ITransactionView>t;
        // name
        res.check = false;
        res.branches = this.GetTreeNames(res.branch_id);
        return res;
    }

    GetTreeNames(branch_id: string, level?: number) {
        let names = [];
        const cache = Model.Org.CacheBranch;
        let branch = cache.GetByID(branch_id) || { name: "n/a", parent: '' };
        return names;
    }

    GetName(branch_id: string) {
        return Model.Org.CacheBranch.GetNameForID(branch_id);
    }

    count$ = new BehaviorSubject<number>(0);
    currentPage$ = new BehaviorSubject<number>(1);
    pageSize$ = new BehaviorSubject<number>(20);

    ExportHistory(filter: ReportFilter) {
        const url = this.api.MakeURL("export", filter.ToBackendQuery());
        window.open(url, "_blank");
    }

    api = new SharedService.Backend.HttpApi<any>("/api/report/transaction");

}
