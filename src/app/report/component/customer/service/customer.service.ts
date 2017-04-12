import { ITransaction, ITransactionView, Customer, IService, IStore, IFre } from '../../shared';
import {
    ICustomer, HttpServiceGenerator, Paging
} from '../../shared/';
import { ReportFilterService } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { IAggregate, Aggregate } from '../../../model';
import { Toast } from '../../../../x/ui/noti/toastr';

export interface IHistory {
    data: ITransactionView[];
    total: number;
}

export const paging = new Paging<ITransactionView>();
export const RxInfoCustomer = new BehaviorSubject<ICustomer>(null);

@Injectable()
export class CustomerAPI {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    toast = new Toast;
    GetHistory(skip: number, limit: number, code: string, id: string) {
        const query = Object.assign({
            skip: skip,
            limit: limit,
            code: code,
            id: id,

        }, this.filterService.ToBackendQuery());

        return this.api.Get<IHistory>("customer_history", query);
    }
    pagin(page: number, code: string, id: string) {
        const skip = paging.SkipForPage(page);
        const limit = paging.Limit;
        this.GetHistory(skip, limit, code, id)
            .subscribe(v => {
                paging.SetPage(page);
                paging.Reset(v.data, v.total);
            });
    }

    Search(code: string, id: string) {
        this.api.Get<IHistory>("customer_history", this.makeQuery(code, id)).subscribe(v => {
            if (v.data.length > 0) {
                this.RxCustomer.next(v.data);
            } else {
                this.RxCustomer.next(v.data);
                this.toast.Title('Info').Info("Not Customer Data").Show();
            }

        });
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

    private toTransactionView(t: ITransaction) {
        var res = <ITransactionView>t;

        return res;
    }


    RxCustomer = new BehaviorSubject<ITransaction[]>([]);

    get RxSummaryView() {
        return this.RxCustomer.map(Customer.Make);
    };

    groupBy$ = new BehaviorSubject<string>('branch_id');

    period$ = new BehaviorSubject<string>('day');
    period_month$ = new BehaviorSubject<string>('month');

    ExportHistory() {
        const url = this.api.MakeURL("export", this.filterService.ToBackendQuery());
        window.open(url, "_blank");
    }
    apiCustomer = this.httpServiceGenerator.make<any>("/api/report/customer");
    api = this.httpServiceGenerator.make<any>("/api/report/transaction");

}
