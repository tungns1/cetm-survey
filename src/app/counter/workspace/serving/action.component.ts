import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { TicketDetailDialog } from '../ticket';
import { ModalComponent, Ticket } from '../shared';

import {
    WorkspaceService, QueueService,
    LedService, TicketActionName,
    TicketService
} from '../shared';

@Component({
    selector: 'ticket-action',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.scss'],
})
export class ActionComponent {
    constructor(
        private workspaceService: WorkspaceService,
        private queueService: QueueService,
        private ticketService: TicketService,
        private mdDialog: MdDialog
    ) { }

    @Input() ticket: Ticket;

    auto_next$ = this.workspaceService.Workspace$.map(w => w.AutoNext);

    Move() {
        const config = new MdDialogConfig();
        config.width = '350px';
        config.data = this.ticket;
        const dialog = this.mdDialog.open(TicketDetailDialog, config);
    }

    Next() {
        this.triggerAction("finish").subscribe(() => {
            this.workspaceService.SetAutoNext(true);
        });
    }

    NoNext() {
        this.workspaceService.SetAutoNext(false);
    }

    Recall() {
        this.triggerAction('recall');
    }

    Finish() {
        this.triggerAction('finish');
    }

    Delete() {
        this.triggerAction('cancel');
    }

    private triggerAction(action: TicketActionName) {
        return this.ticketService.TriggerAction(action, this.ticket);
    }

}