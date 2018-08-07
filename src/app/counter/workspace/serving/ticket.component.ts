import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { TimerComopnent, ProjectConfig, Ticket, WorkspaceService, CacheService, ServiceName, TicketService } from '../shared';
import { ShowLoading, HideLoading } from '../../../../lib/backend';
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
        private workspaceService: WorkspaceService, 
        private ticketService: TicketService,
        private mdDialog: MatDialog,
    ){}


    toggleList(){
        const config = new MatDialogConfig();
        config.width = '450px';
        config.data = this.ticket;
        const dialog = this.mdDialog.open(AddServiceDialogComponent, config);
        // this.showList = !this.showList;
    }
}

