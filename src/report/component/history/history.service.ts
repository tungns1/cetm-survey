import { ITransaction, ITransactionView } from '../shared';
import { SharedService, Model } from '../shared/';
import { ReportFilterService, ReportFilter } from '../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';


export interface IHistory {
    data: ITransaction[];
    total: number;
}

@Injectable()
export class TransactionHistoryApi {
    constructor(
        private filterService: ReportFilterService
    ) { }

    Refresh(filter: ReportFilter) {
        this.api.Get<IHistory>("read", this.makeQuery(filter)).subscribe(v => {
            this.data$.next(v.data.map(d => this.toTransactionView(d)));
            this.count$.next(v.total);
        });
    }

    private makeQuery(filter: ReportFilter) {
        return Object.assign({
            skip: (this.currentPage$.value - 1) * this.pageSize$.value,
            limit: this.pageSize$.value,
        }, filter.ToBackendQuery());
    }

    private toTransactionView(t: ITransaction) {
        var res = <ITransactionView>t;
        // name
        res.check=false;
        res.branches = this.GetTreeNames(res.branch_id);
        return res;
    }

    GetTreeNames(branch_id: string, level?: number) {
        let names = [];
        const cache = Model.Org.CacheBranch;
        let branch = cache.GetByID(branch_id) || { name: "n/a", parent: '' };
        // for (let i = 0; i < Branch.AllLayers.length; i++) {
        //     names.push(branch.name || "n/a");
        //     branch = cache.GetByID(branch.parent) || { name: 'n/a', parent: '' };
        // }
        return names;
    }

    GetName(branch_id: string) {
        return Model.Org.CacheBranch.GetNameForID(branch_id);
    }

    count$ = new BehaviorSubject<number>(0);
    data$ = new BehaviorSubject<ITransactionView[]>([]);
    currentPage$ = new BehaviorSubject<number>(1);
    pageSize$ = new BehaviorSubject<number>(20);

    ExportHistory(filter: ReportFilter) {
        const url = this.api.MakeURL("export", filter.ToBackendQuery());
        window.open(url, "_blank");
    }

    api = new SharedService.Backend.HttpApi<any>("/api/report/transaction");

}
