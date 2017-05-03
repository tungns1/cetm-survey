import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ICustomer, Ticket, TicketStates } from '../../shared';
import { MonitorCustomerService } from '../shared';
import { MdDialogRef } from '@angular/material';
import { MonitorFocusService } from '../shared';

@Component({
    selector: 'ticket-detail',
    templateUrl: 'ticketDetail.component.html',
    styleUrls: ['ticketDetail.component.scss']
})
export class TicketDetailComponent {

    constructor(
        private dialogRef: MdDialogRef<TicketDetailComponent>,
        private customerService: MonitorCustomerService,
        private monitorFocus: MonitorFocusService
    ) { }

    SetTicket(t: Ticket) {
        this.ticket = t;
        if (t.state === TicketStates.Waiting) {
            this.showWaiting = true;
            this.showServing = false;
        } else if (t.state == TicketStates.Missed) {
            this.showWaiting = true;
            this.showServing = false;
        } else {
            this.showWaiting = false;
            this.showServing = true;
        }
    }

    private ticket: Ticket;
    private customer: ICustomer;
    private showWaiting = false;
    private showServing = false;

    private box$ = this.monitorFocus.Box$;

    private getCusInfo(id: string) {
        this.customerService.GetCustomerByID(id).subscribe(v => {
            this.customer = v;
        });
    }

    private close() {
        this.dialogRef.close();
    }
}