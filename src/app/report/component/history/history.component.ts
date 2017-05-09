import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ITransactionView } from '../../model';
import { Paging, ReportNavService } from '../../service/';
import { TransactionHistoryApi, IHistoryFilter } from './history.service';
import { TransactionComponent } from './transaction.component';

@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})
export class HistoryComponent {
    constructor(
        private mdDialog: MdDialog,
        private nav: ReportNavService,
        private transactionHistoryApi: TransactionHistoryApi
    ) { }


    onFilterChange(filter: IHistoryFilter) {
        this.filter = filter;
        this.pagin(1);
    }


    paging = new Paging<ITransactionView>();
    filter: IHistoryFilter;

    ngOnInit() {
        this.nav.Refresh$.ExclusiveSubscribe(_ => {
            this.pagin(1);
        });
    }

    pagin(page: number = 1) {
        const skip = this.paging.SkipForPage(page);
        const limit = this.paging.Limit;
        this.transactionHistoryApi.GetHistory(skip, limit, this.filter)
            .subscribe(v => {
                this.paging.SetPage(page);
                this.paging.Reset(v.data, v.total);
            });
    }

    excel() {
        this.transactionHistoryApi.ExportHistory();
    }


    showDetails(tr: ITransactionView) {
        const config = new MdDialogConfig();
        config.width = '350px';
        config.height = '425px';
        const dialog = this.mdDialog.open(TransactionComponent, config); 
        dialog.componentInstance.SetData(tr);
    }

}
