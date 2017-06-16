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
    curentPage: number = 1;
    totalPage: number;
    cellClass: string[] = ['center', 'padding-10'];

    private gridOptions: GridOptions = {
        rowHeight: 35,
        rowSelection: 'multiple',
        pagination: true,
        paginationPageSize: 18,
        suppressPaginationPanel: true,
        enableServerSideSorting: true,
        rowModelType: 'infinite',
        maxBlocksInCache: 18,
        getRowNodeId: function (item) {
            return item.id;
        },

        onCellClicked: (e) => {
            if (e.event.target.localName === 'img')
                this.showDetails(e.data);
        },
        onRowDataChanged: () => {
            this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1;
            this.totalPage = this.gridOptions.api.paginationGetTotalPages()
        }
    };

    ngOnInit() {
    }

    setRowData(rowData, totalRow: number = -1, skip: number) {
        rowData.forEach((row, index) => row['order'] = index + skip + 1);
        var dataSource = {
            rowCount: 18,
            getRows: function (params) {
                params.successCallback(rowData, totalRow);
            }
        };
        this.gridOptions.api.setDatasource(dataSource);
    }

    detailCellRenderer() {
        return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
    }

    jumpToFirst() {
        if (this.curentPage > 1) {
            this.pagin(1);
            this.curentPage = 1;
        }
    }

    prevPage() {
        if (this.curentPage > 1) {
            this.pagin(this.curentPage - 1);
            this.curentPage -= 1;
        }
    }

    nextPage() {
        if (this.curentPage < this.totalPage) {
            this.pagin(this.curentPage + 1);
            this.curentPage += 1;
        }
    }

    jumpToLast() {
        if (this.curentPage < this.totalPage) {
            this.pagin(this.totalPage);
            this.curentPage = this.totalPage;
        }
    }

    jumpToPage(pageIndex: number) {
        if (pageIndex > 0 && pageIndex < this.totalPage) {
            this.pagin(pageIndex);
            this.curentPage = pageIndex;
        }
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
                this.setRowData(v.data, v.total, skip);
                this.gridOptions.api.setInfiniteRowCount(v.total);
                this.totalPage = Math.ceil(v.total / 18);
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