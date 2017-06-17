import { ICustomer } from '../../shared';
import {
    ReportFilterService, Paging
} from '../../shared';
import { ITransaction, ITransactionView } from './transaction_view';
import { HttpServiceGenerator } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

export interface IHistory {
    data: ITransactionView[];
    total: number;
}

export interface IHistoryFilter {
    wtimemin: number;
    wtimemax: number;
    stimemin: number;
    stimemax: number;
    rating: string;
}

@Injectable()
export class TransactionHistoryApi {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    GetHistory(skip: number, limit: number, filterHistory: IHistoryFilter) {
        const query = Object.assign({
            skip: skip,
            limit: limit
        }, this.filterService.ToBackendQuery(), filterHistory);

        return this.api.Get<IHistory>("read", query);
    }
    GetInfoCustomer(idCustomer: string) {
        return this.apiCustomer.Get<ICustomer>("get_customer_by_id", { id: idCustomer });
    }


    ExportHistory(filterHistory: IHistoryFilter) {
        const query = Object.assign({}, this.filterService.ToBackendQuery(), filterHistory);
        const url = this.api.MakeURL("export", query);
        window.open(url, "_blank");
    }
    apiCustomer = this.httpServiceGenerator.make<any>("/api/report/customer");
    api = this.httpServiceGenerator.make<any>("/api/report/transaction");
}
