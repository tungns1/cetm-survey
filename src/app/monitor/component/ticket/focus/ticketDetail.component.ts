import { Component, OnInit, Input, ViewChild, Optional, Inject } from '@angular/core';
import { ICustomer, Ticket, TicketStates } from '../../shared';
import { MonitorCustomerService } from '../shared';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MonitorFocusService } from '../shared';
import {ProjectConfig} from '../shared';

@Component({
    selector: 'ticket-detail',
    templateUrl: 'ticketDetail.component.html',
    styleUrls: ['ticketDetail.component.scss']
})
export class TicketDetailComponent {

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
        private customerService: MonitorCustomerService,
        private monitorFocus: MonitorFocusService
    ) { }

    private ticket: Ticket;
    private customer: ICustomer;
    private showWaiting = false;
    private showServing = false;

    private box$ = this.monitorFocus.Box$;

    maxWaitingMinute = ProjectConfig.service.max_waiting_minute;
    maxServingMinute = ProjectConfig.service.max_serving_minute;

    ngOnInit() {
        this.ticket = this.dialogData;
    }

    private getCusInfo(id: string) {
        this.customerService.GetCustomerByID(id).subscribe(v => {
            this.customer = v;
        });
    }
}