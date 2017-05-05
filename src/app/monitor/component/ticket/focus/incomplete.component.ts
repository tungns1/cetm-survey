import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TicketDetailComponent } from './ticketDetail.component';
import { Ticket } from '../../shared';

@Component({
    selector: "app-incomplete-ticket",
    templateUrl: "incomplete.html",
    styleUrls: ['incomplete.scss']
})
export class IncompleteTicketComponent {
    constructor(
        private mdDialog: MdDialog
    ) { }

    showDetails(t: Ticket) {
        this.dialog = this.mdDialog.open(TicketDetailComponent);
        if(t) this.dialog.componentInstance.SetTicket(t);
    }

    @Input("data") set _data(v: Ticket[]) {
        this.data = v || [];
        this.data.forEach(t => this.addHelperField(t));
        console.table(this.data);
    };

    data: Ticket[] = [];

    // add user_id, service_id and counter_id 
    // for finished and cancelled ticket
    private addHelperField(t: Ticket) {
        t.service_id = t.service_id || t.services[0];
    }

    private dialog: MdDialogRef<TicketDetailComponent>;
}
