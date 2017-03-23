import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransactionView } from '../../model';
import { Paging, ReportNavService  } from '../../service/';
import { TransactionHistoryApi } from './history.service';

@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})
export class HistoryComponent {
    constructor(
        private nav: ReportNavService,
        private transactionHistoryApi: TransactionHistoryApi
    ) { }

    
    onSubmit() {
        const skip = this.paging.SkipForPage(1);
        const limit = this.paging.Limit;
        this.transactionHistoryApi.GetHistory(skip, limit, this.filter)
        .subscribe(v => {
            this.paging.SetPage(1);
            this.paging.Reset(v.data, v.total);
        });
    }

    filter = {
        wtimemin: 0,
        wtimemax: 0,
        stimemin: 0,
        stimemax: 0,
        rating: ''
    };

    sync(){
        if(this.filter.wtimemin > this.filter.wtimemax)
            this.filter.wtimemax = this.filter.wtimemin;
        if(this.filter.stimemin > this.filter.stimemax)
            this.filter.stimemax = this.filter.stimemin;
    }

    paging = new Paging<ITransactionView>();

    ngOnInit() {
        this.nav.Refresh$.ExclusiveSubscribe(_ => {
            this.pagin(1);
        });
    }

    pagin(page: number) {
        const skip = this.paging.SkipForPage(page);
        const limit = this.paging.Limit;
        const filter = {};
        this.transactionHistoryApi.GetHistory(skip, limit, filter)
            .subscribe(v => {
                this.paging.SetPage(page);
                this.paging.Reset(v.data, v.total);
            });
    }

    excel() {
        this.transactionHistoryApi.ExportHistory();
    }
    
}
