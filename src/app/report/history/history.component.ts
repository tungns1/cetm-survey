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

        pagination: true,
        paginationPageSize: 18,
        suppressPaginationPanel: true,
        enableServerSideSorting: true,
        rowModelType: 'infinite',
        cacheOverflowSize: 10,
        maxConcurrentDatasourceRequests: 2,
        infiniteInitialRowCount: 1,
        maxBlocksInCache: 2,
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

        allOfTheData.forEach(function (data, index) {
            data.id = 'R' + (index + 1);
        });

        var dataSource = {
            rowCount: null, // behave as infinite scroll
            getRows: function (params) {
                console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                // At this point in your code, you would call the server, using $http if in AngularJS 1.x.
                // To make the demo look real, wait for 500ms before returning
                setTimeout(function () {
                // take a slice of the total rows
                // var dataAfterSortingAndFiltering = sortAndFilter(allOfTheData, params.sortModel, params.filterModel);
                var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
                // if on or after the last page, work out the last row.
                var lastRow = -1;
                if (allOfTheData.length <= params.endRow) {
                    lastRow = allOfTheData.length;
                }
                // call the success callback
                params.successCallback(rowsThisPage, lastRow);
            }, 500);
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
        this.gridOptions.api.paginationGoToFirstPage();
        this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
    }

    prevPage() {
        this.gridOptions.api.paginationGoToPreviousPage();
        this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
    }

    nextPage() {
        this.gridOptions.api.paginationGoToNextPage();
        this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
    }

    jumpToLast() {
        this.gridOptions.api.paginationGoToLastPage();
        this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
    }

    jumpToPage(pageIndex: number) {
        this.gridOptions.api.paginationGoToPage(pageIndex - 1);
        this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
    }

    onFilterChange(filter: IHistoryFilter) {
        this.filter = filter;
        this.pagin(1);
    }

    refresh() {
        this.pagin(1);
    }

    pagin(page: number = 5) {
        const skip = this.paging.SkipForPage(page);
        const limit = this.paging.Limit;
        this.transactionHistoryApi.GetHistory(skip, limit, this.filter)
            .subscribe(v => {
                console.log(v);
                this.paging.SetPage(page);
                this.paging.Reset(v.data, v.total);
                this.setRowData(v.data);
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