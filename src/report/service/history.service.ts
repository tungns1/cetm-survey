import { ITransaction, IHistory, ITransactionView } from '../model';
import { SharedService, Branch } from '../shared/';
import { IFilter, GetFilter } from './filter.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class TransactionHistoryApi {
    Refresh(filter: IFilter) {
        let res = this.api.Get<IHistory>("read", filter).do(v => {
            console.log(v);
            this.RxHistory.next(v.data.map(d => this.toTransactionView(d)));
            this.RxCount.next(v.total);
        });
        res.subscribe();
    }

    private toTransactionView(t: ITransaction) {
        var res = <ITransactionView>t;
        // name
        res.branches = Branch.GetTreeNames(res.branch_id);
        return res;
    }

    RxCount = new BehaviorSubject<number>(0);
    RxHistory = new BehaviorSubject<ITransactionView[]>([]);

    ExportHistory() {
        const url = this.api.MakeURL("export", GetFilter());
        window.open(url, "_blank");
    }

    api = new SharedService.Backend.HttpApi<any>("/api/report/transaction");

}
