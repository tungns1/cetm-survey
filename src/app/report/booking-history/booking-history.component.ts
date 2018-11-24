import { Component } from '@angular/core';
import { BookingService, paging } from '../shared/service/booking-service.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { GridOptions } from 'ag-grid';
import { ShowLoading, HideLoading } from '../../../lib/backend';
import { IAppointmentDetail } from '../appointment-performance/shared/appointment-performance.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
// import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { TimeDurationPipe } from '../../x/ng/time/timeDuration';
import { IUser, Paging, CacheBranch } from '../shared';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
@Component({
    selector: 'app-booking-history',
    templateUrl: './booking-history.component.html',
    styleUrls: ['./booking-history.component.scss']
})

export class BookingHistoryComponent {

    constructor(
        private bookingService: BookingService, 
        private datePipe: DatePipe, 
        private secondToTime: TimeDurationPipe, 
        private mdDialog: MatDialog,
    ) { }
    paging = new Paging<IAppointmentDetail>();
    data$ = this.bookingService.bookingHistory$;
    dataTable: IAppointmentDetail[] = [];
    curentPage: number = 1;
    totalPage: number;
    code = '';
    manager$ = this.bookingService.listManager$;

    public gridOptions: GridOptions = {
        rowHeight: 35,
       
        onCellClicked: (e) => {
            if (e.event.target['localName'] === 'img')
                this.showDetails(e.data);
        },
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
    
    };

    detailCellRenderer(d) {
        if (d.data)
            return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
        else return '';
    }

    getTransactionStatus(status){
        let result = '-'
        switch(status){
            case 'finished':
                result = 'Finish'
                break;
            case 'deleted':
                result = 'Cancel'
                break;
            case 'created':
                result = 'Created';
                break;
            case 'confirmed':
                result = 'Confirmed';
                break;
            default:
                result = 'Not arrived';
                break;
        }
        return result;
    }

    cellClass: string[] = ['center', 'padding-10'];
   
    showDetails(data: IAppointmentDetail) {
        // console.log(data)
        if (data) {
            
            const config = new MatDialogConfig();
            config.width = '550px';
            config.data = data;
            const dialog = this.mdDialog.open(DetailModalComponent, config);
        }
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

    refresh() {
        // this.bookingService.Refresh('history');
        this.pagin(1)
    }

    pagin(page: number = 1) {
        ShowLoading();
        const skip = this.paging.SkipForPage(page);
        const limit = this.paging.Limit;
        this.bookingService.RefreshHistory(skip, limit)
            .subscribe(data => {
                if (data.tickets.length > 0) {
                    console.log(data)
                    this.dataTable = data.tickets.map((item, index) => {
                        console.log(item)
                        item.branch_name = CacheBranch.GetByID(item.branch_id).name
                        item['created_time_hm'] = this.datePipe.transform(item.created_at* 1000, 'HH:mm');
                        item['created_time_date'] = this.datePipe.transform(item.created_at * 1000, 'dd/MM/yyyy')
                        item.type_ticket = item.type_ticket === 'book_schedule' ? 'Schedule' : 'Get ticket'
                        item['appoinment_time'] = item.time_go_bank > 0 ? this.datePipe.transform(item.time_go_bank* 1000, 'HH:mm dd/MM/yyyy') : '-'
                        item['arrived'] = item.check_in_at > 0 ? 'Yes' : 'No';
                        item['check_in_time'] = item.check_in_at > 0 ? this.datePipe.transform(item.check_in_at* 1000, 'HH:mm dd/MM/yyyy') : '-'
                        item['wait_time'] = item.waiting_time > 0 ? this.secondToTime.transform(item.waiting_time) : '-'
                        item['serve_time'] = item.serving_time > 0 ? this.secondToTime.transform(item.serving_time) : '-'
                        item['transaction_status'] = this.getTransactionStatus(item.status)
                        item['customer_name'] = item['customer_name'] !== '' ? item['customer_name'] : ''
                        return item;
                    })
                }

                // console.log(v)
                this.paging.SetPage(page);
                this.paging.Reset(this.dataTable, data.total);
                this.setRowData(this.dataTable, data.total, skip);
                this.gridOptions.api.setInfiniteRowCount(data.total);
                this.totalPage = Math.ceil(data.total / 18);
                if (this.curentPage > this.totalPage)
                    this.curentPage = this.totalPage;
                HideLoading();
            });
    }
}
