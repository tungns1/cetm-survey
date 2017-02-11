import { ITransaction, IHistory, ITransactionView } from '../model';
import { SharedService, Model } from '../shared/';
import { FilterService } from './filter.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class TransactionHistoryApi {
    constructor(
        private filterService: FilterService
    ) { }

    Refresh() {
        // let res = this.api.Get<IHistory>("read", filter).do(v => {
        //     console.log(v);
        //     this.RxHistory.next(v.data.map(d => this.toTransactionView(d)));
        //     this.RxCount.next(v.total);
        // });
        // res.subscribe();
    }

    private toTransactionView(t: ITransaction) {
        var res = <ITransactionView>t;
        // name
        res.branches = this.GetTreeNames(res.branch_id);
        return res;
    }

    GetTreeNames(branch_id: string, level?: number) {
        let names = [];
        const cache = Model.Org.CacheBranch;
        let branch = cache.GetByID(branch_id) || { name: "n/a", parent: '' };
        for (let i = 0; i < Branch.AllLayers.length; i++) {
            names.push(branch.name || "n/a");
            branch = cache.GetByID(branch.parent) || { name: 'n/a', parent: '' };
        }
        return names;
    }

    GetName(branch_id: string) {
        var branch = Branch.Branches.get(branch_id);
        return branch ? branch.name : 'n/a';
    }

    RxCount = new BehaviorSubject<number>(0);
    RxHistory = new BehaviorSubject<ITransactionView[]>([]);

    ExportHistory() {
        const url = this.api.MakeURL("export");
        window.open(url, "_blank");
    }

    api = new SharedService.Backend.HttpApi<any>("/api/report/transaction");

}
