import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Paging } from '../shared';
import { ITransactionView, TransactionHistoryApi, IHistoryFilter } from './shared';
import { TransactionComponent } from './transaction.component';
import { GridOptions } from "ag-grid";

@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})
export class HistoryComponent {
    constructor(
        private mdDialog: MdDialog,
        private transactionHistoryApi: TransactionHistoryApi
    ) { }

    paging = new Paging<ITransactionView>();
    filter: IHistoryFilter;
    isShowPagin: boolean = true;

    private gridOptions: GridOptions = {
        pagination: true,
        paginationAutoPageSize: true,
        onCellClicked: (e) => {
            if (e.event.target.localName === 'img')
                this.showDetails(e.data);
        },
        rowSelection: 'multiple',
    };
    private data: object[];

    ngOnInit() {
        this.paging.pages$.subscribe(d => {
            if (d.length < 2) this.isShowPagin = false;
            else this.isShowPagin = true;
        });
        this.paging.data$.subscribe(d => {
            this.data = d;
        });
    }

    detailCellRenderer() {
        return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
    }

    noCellRenderer(d){
        return d.rowIndex + 1;
    }
    



    onFilterChange(filter: IHistoryFilter) {
        this.filter = filter;
        this.pagin(1);
    }

    refresh() {
        this.pagin(1);
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
        config.data = tr;
        const dialog = this.mdDialog.open(TransactionComponent, config);
    }

}