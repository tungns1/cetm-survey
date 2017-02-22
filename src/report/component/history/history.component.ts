import { Component, OnInit } from '@angular/core';
import { ITransactionView } from '../../model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/Observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ReportFilterService } from '../../service/';
import { TransactionHistoryApi } from './history.service';

@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.css']
})
export class HistoryComponent {
    constructor(
        private filterService: ReportFilterService,
        private transactionHistoryApi: TransactionHistoryApi
    ) { }

    paging = this.transactionHistoryApi.Paging;

    ngOnInit() {
        this.Refresh();
    }

    Refresh() {
        this.filterService.ExclusiveSubscribe(filter => {
            this.transactionHistoryApi.Refresh(filter);
        });
    }

    chuyenTrang(page: number) {
        this.paging.MoveToPage(page);
        this.transactionHistoryApi.Refresh(this.filterService.Current);
    }

    excel() {
        this.transactionHistoryApi.ExportHistory(this.filterService.Current);
    }

}
