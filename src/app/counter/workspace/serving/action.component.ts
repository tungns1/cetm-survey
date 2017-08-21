import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { TicketDetailDialog } from '../ticket';
import { ModalComponent, Ticket } from '../shared';
import { NoticeComponent } from '../shared';

import {
    WorkspaceService, QueueService,
    LedService, TicketActionName,
    TicketService, FeedbackService
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
        private feedbackService: FeedbackService,
        private mdDialog: MdDialog
    ) { }


    @ViewChild(NoticeComponent) notice: NoticeComponent;

    @Input() ticket: Ticket;

    auto_next$ = this.workspaceService.Workspace$.map(w => w.AutoNext);

    Move() {
        const config = new MdDialogConfig();
        config.width = '450px';
        config.data = this.ticket;
        const dialog = this.mdDialog.open(TicketDetailDialog, config);
    }

    Next() {
        if (this.feedbackService.CheckFeedback(this.ticket)) {
            this.notice.ShowMessage("feedback_skip");
        } else {
            this.triggerAction("finish").subscribe(() => {
                this.workspaceService.SetAutoNext(true);
            });
        }
    }

    NoNext() {
        this.workspaceService.SetAutoNext(false);
    }

    Recall() {
        this.triggerAction('recall');
    }

    Finish() {
        if (this.feedbackService.CheckFeedback(this.ticket)) {
            this.notice.ShowMessage("feedback_skip");
        } else {
            this.triggerAction('finish');
        }

    }

    Delete() {
        this.triggerAction('cancel');
    }

    Miss() {

        this.triggerAction('miss');
    }

    private triggerAction(action: TicketActionName) {
        return this.ticketService.TriggerAction(action, this.ticket);
    }

    hasMiss = false;

}