import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ITransaction, CacheService, CacheBranch, RuntimeEnvironment, USER_ROLES } from '../../shared';
import { CustomerAPI, paging, RxInfoCustomer } from '../service/customer.service';
import { TransactionComponent } from './transaction.component';
import { GridOptions } from "ag-grid";
import { ShowLoading, HideLoading } from '../../../../lib/backend/loading';


@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})

export class HistoryComponent {
    constructor(
        private mdDialog: MdDialog,
        private customerAPI: CustomerAPI,
        private env: RuntimeEnvironment
    ) { }
    @Input() id: string; //cus id passed from report - history
    // paging = paging;
    curentPage: number = 1;
    totalPage: number;
    code = '';
    cellClass: string[] = ['center', 'padding-10'];
    public gridOptions: GridOptions = {
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
        // if data passed from report - history
        if (this.id) {
            this.customerAPI.pagin(1, '', this.id);
        } else {
            this.pagin(1);
        }

        RxInfoCustomer.subscribe(v => {
            if (v != null) {
                this.code = v.code;
            }

        })
    }

    detailCellRenderer(d) {
        if (d.data)
            return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
        else return '';
    }

    setRowData(rowData, totalRow: number = -1, skip: number) {
        rowData.forEach((row, index) => row['order'] = index + skip + 1);
        var dataSource = {
            rowCount: 18,
            getRows: function (params) {
                params.successCallback(rowData, totalRow);
            }
        };
        if (this.gridOptions.api)
            this.gridOptions.api.setDatasource(dataSource);
    }

    serviceCellRenderer(d) {
        if (d.data)
            return CacheService.ServiceName(d.data.service);
        else return '';
    }

    storeCellRenderer(d) {
        if (d.data) {
            return CacheBranch.GetNameForID(d.data.branch_id);
        }
        else return '';
    }

    branchCellRenderer(d) {
        if (d.data) {
            return CacheBranch.GetNameForID(CacheBranch.GetForID(d.data.branch_id).parent);
        }
        else return '';
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
        if (pageIndex > 0 && pageIndex <= this.totalPage) {
            this.pagin(pageIndex);
            this.curentPage = pageIndex;
        }
    }

    pagin(page: number = 1) {
        ShowLoading();
        const skip = paging.SkipForPage(page);
        const limit = paging.Limit;
        RxInfoCustomer.subscribe(cus => {
            if (cus) {
                this.customerAPI.GetHistory(skip, limit, cus.code, '')
                    .subscribe(v => {
                        paging.SetPage(page);
                        paging.Reset(v.data, v.total);
                        this.setRowData(v.data, v.total, skip);
                        if (this.gridOptions.api)
                            this.gridOptions.api.setInfiniteRowCount(v.total);
                        this.totalPage = Math.ceil(v.total / 18);
                        if (this.curentPage > this.totalPage)
                            this.curentPage = this.totalPage;
                        HideLoading();
                    });
            }
            else HideLoading();
        });
    }

    showDetails(ticket: ITransaction) {
        this.env.Auth.User$.subscribe(u => {
            if (u.role === USER_ROLES.ADMIN_STANDARD)
                ticket.audio = '';
        });
        const config = new MdDialogConfig();
        config.width = '350px';
        config.data = ticket;
        const dialog = this.mdDialog.open(TransactionComponent, config);
    }

    excel(data) {
        this.customerAPI.ExportHistoryExcel(this.id, this.code);
    }
    csv() {
        this.customerAPI.ExportHistoryCsv(this.id, this.code);
    }

}