import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TicketDetailComponent } from './ticketDetail.component';
import { Ticket, ProjectConfig } from '../../shared';

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
    test = ProjectConfig;

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
