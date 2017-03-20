import { ITransaction, ITransactionView, ICustomer } from '../shared';
import {
    ReportFilterService, ReportFilter,
    HttpServiceGenerator
} from '../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Paging } from '../../shared/paging.service';
export interface IHistory {
    data: ITransactionView[];
    total: number;
}

@Injectable()
export class TransactionHistoryApi {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    GetHistory(filter: ReportFilter, skip: number, limit: number, filterHistory: object) {
        const query = Object.assign({
            skip: skip,
            limit: limit
        }, filter.ToBackendQuery(), filterHistory);

        return this.api.Get<IHistory>("read", query);
    }
    GetInfoCustomer(idCustomer: string) {
        return this.apiCustomer.Get<ICustomer>("get_customer_by_id", { id: idCustomer });
    }


    ExportHistory(filter: ReportFilter) {
        const url = this.api.MakeURL("export", filter.ToBackendQuery());
        window.open(url, "_blank");
    }
    apiCustomer = this.httpServiceGenerator.make<any>("/api/report/customer");
    api = this.httpServiceGenerator.make<any>("/api/report/transaction");
}
