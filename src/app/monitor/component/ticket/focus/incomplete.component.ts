import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { TicketDetailComponent } from './ticketDetail.component';
import { Ticket, ProjectConfig, CacheService } from '../../shared';
import { TicketIconComponent } from '../../../../shared/businessQapp/ticket-icon.component';
import { GridOptions } from 'ag-grid';
import { LocalDayTimePipe } from '../../../../x/ng/time/localDayTime'
import { TimerComopnent } from '../../../../x/ng/time/timer.component'

@Component({
    selector: "app-incomplete-ticket",
    templateUrl: "incomplete.html",
    styleUrls: ['incomplete.scss']
})
export class IncompleteTicketComponent {
    constructor(
        private mdDialog: MatDialog
    ) { }

    @Input("data") set _data(v: Ticket[]) {
        this.data = v || [];
        this.data.forEach(t => this.addHelperField(t));
    };

    private dialog: MatDialogRef<TicketDetailComponent>;
    data: Ticket[] = [];
    curentPage: number = 1;
    totalPage: number;
    maxWaitingMinute = ProjectConfig.service.max_waiting_minute;

    private gridOptions: GridOptions = {
        rowHeight: 35,
        rowSelection: 'multiple',
        paginationPageSize: 12,
        pagination: true,
        // suppressPaginationPanel: true,
        onCellClicked: (e) => {
            if (e.event.target['localName'] === 'img')
                this.showDetails(e.data);
        },
        // onRowDataChanged: () => {
        //     this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1;
        //     this.totalPage = this.gridOptions.api.paginationGetTotalPages();
        // }
    };
    waitingTime = TimerComopnent;
    ticketIconNumber = TicketIconComponent;
    cellclass: string[] = ['padding-10', 'center'];

    detailCellRenderer() {
        return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
    }

    noCellRenderer(d) {
        return d.rowIndex + 1;
    }

    serviceCellRenderer(d) {
        if (d.data.service_id)
            return CacheService.ServiceName(d.data.service_id);
        else return 'Other';
    }

    printTimeCellRendered(d) {
        let localDayTime = new LocalDayTimePipe();
        return localDayTime.transform(d.data.ctime);
    }

    // jumpToFirst() {
    //     this.gridOptions.api.paginationGoToFirstPage();
    //     this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
    // }

    // prevPage() {
    //     this.gridOptions.api.paginationGoToPreviousPage();
    //     this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
    //     // console.log(this.totalPage = this.gridOptions.api.paginationGetTotalPages());
    // }

    // nextPage() {
    //     this.gridOptions.api.paginationGoToNextPage();
    //     this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
    // }

    // jumpToLast() {
    //     this.gridOptions.api.paginationGoToLastPage();
    //     this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
    // }

    // jumpToPage(pageIndex: number) {
    //     this.gridOptions.api.paginationGoToPage(pageIndex - 1);
    //     this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
    // }

    showDetails(t: Ticket) {
        const config = new MatDialogConfig();
        config.width = '350px';
        config.data = t;
        const dialog = this.mdDialog.open(TicketDetailComponent, config);
    }
    // add user_id, service_id and counter_id 
    // for finished and cancelled ticket
    private addHelperField(t: Ticket) {
        t.service_id = t.service_id || t.services[0];
    }
}
