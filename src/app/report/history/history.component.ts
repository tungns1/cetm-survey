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
    skipRowCount: number = 0;
    curentPage: number = 1;
    totalPage: number;
    cellClass: string[] = ['center', 'padding-10'];

    private gridOptions: GridOptions = {
        rowHeight: 35,

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
        rowSelection: 'multiple',
        onRowDataChanged: () => {
            this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1;
            this.totalPage = this.gridOptions.api.paginationGetTotalPages()
        }
    };

    ngOnInit() {
        // this.paging.data$.subscribe(d => {
        //     console.log('aaaaaaaaaaaa');
        //     console.log(d)
        // });
        // this.paging.info$.subscribe(d => {
        //     console.log('bbbbbbbbbbbb');
        //     console.log(d)
        // });
        // this.paging.pages$.subscribe(d => {
        //     console.log('cccccccccccc');
        //     console.log(d)
        // });
    }

    setRowData(allOfTheData) {

        // allOfTheData.forEach(function (data, index) {
        //     data.id = 'R' + (index + 1);
        // });

        var dataSource = {
            rowCount: 18, // behave as infinite scroll
            getRows: function (params) {
                console.log(params);
                    // take a slice of the total rows
                    var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
                    // if on or after the last page, work out the last row.
                    var lastRow = -1;
                    if (allOfTheData.length <= params.endRow) {
                        lastRow = allOfTheData.length;
                    }
                    // call the success callback
                    params.successCallback(rowsThisPage, lastRow);
            }
        };

        this.gridOptions.api.setDatasource(dataSource);
    }

    detailCellRenderer() {
        return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
    }

    noCellRenderer(d) {
        return d.rowIndex + 1;
    }

    jumpToFirst() {
        // this.gridOptions.api.paginationGoToFirstPage();
        // this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
        this.pagin(1);
        this.curentPage = 1;
    }

    prevPage() {
        // this.gridOptions.api.paginationGoToPreviousPage();
        // this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
        if(this.curentPage > 1){
            this.pagin(this.curentPage - 1);
            this.curentPage -= 1;
        }
    }

    nextPage() {
        // this.gridOptions.api.paginationGoToNextPage();
        // this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
        if (this.curentPage < this.totalPage) {
            this.pagin(this.curentPage + 1);
            this.curentPage += 1;
        }
    }

    jumpToLast() {
        // this.gridOptions.api.paginationGoToLastPage();
        // this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
        this.pagin(this.totalPage);
        this.curentPage = this.totalPage;
    }

    jumpToPage(pageIndex: number) {
        // this.gridOptions.api.paginationGoToPage(pageIndex - 1);
        // this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
        this.pagin(pageIndex);
        this.curentPage = pageIndex;
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
        this.skipRowCount = skip;
        const limit = this.paging.Limit;
                console.log(skip);
        this.transactionHistoryApi.GetHistory(skip, limit, this.filter)
            .subscribe(v => {
                this.paging.SetPage(page);
                this.paging.Reset(v.data, v.total);
                this.setRowData(v.data);
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