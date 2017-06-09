import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
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
        private mdDialog: MdDialog
    ) { }

    @Input("data") set _data(v: Ticket[]) {
        this.data = v || [];
        this.data.forEach(t => this.addHelperField(t));
    };

    private dialog: MdDialogRef<TicketDetailComponent>;
    data: Ticket[] = [];
    maxWaitingMinute = ProjectConfig.service.max_waiting_minute;

    private gridOptions: GridOptions = {
        rowHeight: 35,
        floatingBottomRowData: [],
        getRowStyle: (e) => {

        },
        onCellClicked: (e) => {
            if (e.event.target.localName === 'img')
                this.showDetails(e.data);
        },
        columnDefs: [
            
            {
                headerName: "Value",
                field: "mtime",
                cellRendererFramework: TimerComopnent,
                width: 100
            }
        ]
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

    printTimeCellRendered(d){
        let localDayTime = new LocalDayTimePipe();
        return localDayTime.transform(d.data.ctime);
    }

    // ticketNumCellRenderer(d){
    //     console.log(d.data);
    //     let img = 
    //     if(d.data.ticket_priority)
    //     return d.data.cnum;
    // }

    showDetails(t: Ticket) {
        const config = new MdDialogConfig();
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
