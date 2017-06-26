import { ITransaction } from '../../shared';
import {
    ICustomer, Customer, HttpServiceGenerator, Paging,
    ReportFilterService
} from '../../shared';
import { CustomerView, ICustomerView } from '../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

export interface IHistory {
    data: ITransaction[];
    total: number;
}

export const paging = new Paging<ITransaction>();
export const RxInfoCustomer = new BehaviorSubject<Customer>(null);

@Injectable()
export class CustomerAPI {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    GetHistory(skip: number, limit: number, code: string, id: string) {
        const query = Object.assign({
            skip: skip,
            limit: limit,
            code: code,
            id: id,

        }, this.filterService.ToBackendQuery());

        return this.apiCustomer.Get<IHistory>("history_customer", query);
    }

    pagin(page: number, code: string, id: string) {
        const skip = paging.SkipForPage(page);
        const limit = paging.Limit;
        this.GetHistory(skip, limit, code, id)
            .subscribe(v => {
                paging.SetPage(page);
                paging.Reset(v.data, v.total);
            });
        paging.SetPage(0);
        paging.Reset(null, 0);
    }

    GetInfo(code: string, id: string) {
        this.apiCustomer.Get<ICustomerView>("info", this.makeQuery(code, id)).subscribe(v => {
            this.RxCustomer.next(v);
        });
        this.RxCustomer.next(null);
    }
    GetInfoCustomerByCode(code: string) {
        return this.apiCustomer.Get<ICustomer>("get_customer_by_code", { code: code });
    }
    GetInfoCustomerById(id: string) {
        return this.apiCustomer.Get<ICustomer>("get_customer_by_id", { id: id });
    }

    private makeQuery(code: string, id: string) {
        return Object.assign({
            code: code,
            id: id,
        }, this.filterService.ToBackendQuery());
    }

    RxCustomer = new BehaviorSubject<ICustomerView>(null);

    get RxSummaryView() {
        return this.RxCustomer.map(CustomerView.Make);
    };

    ExportHistory(id: string,code:string) {
        const query = Object.assign({ id: id,code:code }, this.filterService.ToBackendQuery());
        const url = this.api.MakeURL("export_customer", query);
        window.open(url, "_blank");
    }
    apiCustomer = this.httpServiceGenerator.make<any>("/api/report/customer");
    api = this.httpServiceGenerator.make<any>("/api/report/transaction");

}
