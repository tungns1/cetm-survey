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

    GetHistory(filter: ReportFilter, skip: number, limit: number) {
        const query = Object.assign({
            skip: skip,
            limit: limit,
        }, filter.ToBackendQuery());

        return this.api.Get<IHistory>("read", query);
    }

    ExportHistory(filter: ReportFilter) {
        const url = this.api.MakeURL("export", filter.ToBackendQuery());
        window.open(url, "_blank");
    }

    api = new SharedService.Backend.HttpApi<any>("/api/report/transaction");
}
