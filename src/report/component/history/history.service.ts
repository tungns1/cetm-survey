import { ITransaction, ITransactionView } from '../shared';
import { SharedService, Model } from '../shared/';
import { ReportFilterService, ReportFilter } from '../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Paging } from './paging.service';

export interface IHistory {
    data: ITransactionView[];
    total: number;
}

@Injectable()
export class TransactionHistoryApi {
    constructor(
        private filterService: ReportFilterService
    ) { }

    private paging = new Paging<ITransactionView>();

    get Paging() {
        return this.paging;
    }

    Refresh(filter: ReportFilter) {
        this.api.Get<IHistory>("read", this.makeQuery(filter)).subscribe(v => {
            this.paging.SetData(v.data);
            this.paging.SetCount(v.total);
        });
    }

    private makeQuery(filter: ReportFilter) {
        return Object.assign({
            skip: this.paging.Skip,
            limit: this.paging.Limit,
        }, filter.ToBackendQuery());
    }

    ExportHistory(filter: ReportFilter) {
        const url = this.api.MakeURL("export", filter.ToBackendQuery());
        window.open(url, "_blank");
    }

    api = new SharedService.Backend.HttpApi<any>("/api/report/transaction");
}
