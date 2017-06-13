import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ITransaction, CacheService, CacheBranch } from '../../shared';
import { CustomerAPI, paging } from '../service/customer.service';
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
        private customerAPI: CustomerAPI
    ) { }
    @Input() id: string;
    paging = paging;
    curentPage: number = 1;
    totalPage: number;
    cellClass: string[] = ['center', 'padding-10'];
    private gridOptions: GridOptions = {
        rowHeight: 35,
        pagination: true,
        paginationPageSize: 18,
        suppressPaginationPanel: true,
        onCellClicked: (e) => {
            if (e.event.target.localName === 'img')
                this.openDialog(e.data);
        },
        rowSelection: 'multiple',
        onRowDataChanged: () => {
            this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1;
            this.totalPage = this.gridOptions.api.paginationGetTotalPages()
        }
    };


    ngOnInit() {
        if (this.id != undefined && this.id != "") {
            this.customerAPI.pagin(1, '', this.id);
        }
    }

    detailCellRenderer() {
        return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
    }

    noCellRenderer(d) {
        return d.rowIndex + 1;
    }

    serviceCellRenderer(d) {
        if (d.data.service)
            return CacheService.ServiceName(d.data.service);
        else return 'Other';
    }

    storeCellRenderer(d) {
        if (d.data.branch_id) {
            return CacheBranch.GetNameForID(d.data.branch_id);
        }
        else return 'Other';
    }

    branchCellRenderer(d) {
        if (d.data.branch_id) {
            return CacheBranch.GetNameForID(CacheBranch.GetForID(d.data.branch_id).parent);
        }
        else return 'Other';
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

    pagin(page: number) {
        this.customerAPI.RxSummaryView.subscribe(v => {
            this.customerAPI.pagin(page, '', v.customer_id);
        });

    }

    openDialog(ticket: ITransaction) {
        const config = new MdDialogConfig();
        config.width = '350px';
        config.data = ticket;
        const dialog = this.mdDialog.open(TransactionComponent, config);
    }

    excel(data) {
        this.customerAPI.ExportHistory();
    }

}