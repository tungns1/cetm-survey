import { Component, Input } from '@angular/core';
import { ProjectConfig, Ticket } from '../shared';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddServiceDialogComponent } from './add-service-dialog/add-service-dialog.component';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['emptyAndTicket.component.scss']
})
export class TicketComponent {
    @Input() ticket: Ticket;
    maxServingMinute = ProjectConfig.service.max_serving_minute;
    listService = [];
    showList = false;

    constructor(
        private mdDialog: MatDialog,
    ){}


    toggleList(){
        const config = new MatDialogConfig();
        config.width = '450px';
        config.data = this.ticket;
        const dialog = this.mdDialog.open(AddServiceDialogComponent, config);
    }
}

