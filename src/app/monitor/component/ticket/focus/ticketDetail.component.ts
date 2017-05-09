import { Component, OnInit, Input, ViewChild, Optional, Inject } from '@angular/core';
import { ICustomer, Ticket, TicketStates } from '../../shared';
import { MonitorCustomerService } from '../shared';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MonitorFocusService } from '../shared';

@Component({
    selector: 'ticket-detail',
    templateUrl: 'ticketDetail.component.html',
    styleUrls: ['ticketDetail.component.scss']
})
export class TicketDetailComponent {

    constructor(
        @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
        private dialogRef: MdDialogRef<TicketDetailComponent>,
        private customerService: MonitorCustomerService,
        private monitorFocus: MonitorFocusService
    ) { }

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

    ngOnInit() {
        this.ticket = this.dialogData;
    }
}