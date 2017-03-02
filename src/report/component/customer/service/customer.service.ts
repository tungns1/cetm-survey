import { ITransaction, ITransactionView, Customer, IService, IStore } from '../../shared';
import { SharedService, Model } from '../../shared/';
import { ReportFilterService, ReportFilter } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Paging, count$, currentPage$, pageSize$ } from '../../../shared/paging.service';

export interface IHistory {
    data: ITransactionView[];
    total: number;
}

export const max_service = new BehaviorSubject<IService>(null);
export const max_store = new BehaviorSubject<IStore>(null);
export const paging = new Paging<ITransactionView>();

@Injectable()
export class CustomerAPI {
    constructor(
        private filterService: ReportFilterService
    ) { }


    GetHistory(filter: ReportFilter, skip: number, limit: number, id: string) {
        const query = Object.assign({
            skip: skip,
            limit: limit,
            customer_id: id,
        }, filter.ToBackendQuery());

        return this.api.Get<IHistory>("customer_history", query);
    }
    ChuyenTrang(page: number, customer: string) {
        const skip = paging.SkipForPage(page);
        const limit = paging.Limit;
        this.GetHistory(this.filterService.Current, skip, limit, customer)
            .subscribe(v => {
                paging.SetPage(page);
                paging.Reset(v.data, v.total);
            });
    }

    Search(id: string) {
        let filter = this.filterService.Current;
        this.api.Get<IHistory>("customer_history", this.makeQuery(filter, id)).subscribe(v => {
            if (v.data.length>0) {
                this.RxCustomer.next(v.data);
            } else {
                alert("Dữ liệu khách hàng không có");
            }


        });
    }


    private makeQuery(filter: ReportFilter, id: string) {
        return Object.assign({
            customer_id: id
        }, filter.ToBackendQuery());
    }
    private makeQueryHistory(filter: ReportFilter, id: string) {
        return Object.assign({
            skip: (this.currentPage$.value - 1) * this.pageSize$.value,
            limit: this.pageSize$.value,
            customer_id: id
        }, filter.ToBackendQuery());
    }

    private toTransactionView(t: ITransaction) {
        var res = <ITransactionView>t;

        return res;
    }


    RxCustomer = new BehaviorSubject<ITransaction[]>([]);

    get RxSummaryView() {
        return this.RxCustomer.map(Customer.Make);
    };

    groupBy$ = new BehaviorSubject<string>('branch_id');

    count$ = count$;
    currentPage$ = currentPage$;
    pageSize$ = pageSize$
    period$ = new BehaviorSubject<string>('day');

    ExportHistory(filter: ReportFilter) {
        const url = this.api.MakeURL("export", filter.ToBackendQuery());
        window.open(url, "_blank");
    }

    api = new SharedService.Backend.HttpApi<any>("/api/report/transaction");

}
