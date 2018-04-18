import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TicketDetailDialog } from '../ticket';
import { FeedbackRejectlDialog } from '../ticket/feedback-reject.dialog';
import {
    WorkspaceService, QueueService,
    LedService, TicketActionName,
    TicketService, FeedbackService,
    ModalComponent, Ticket,
    NoticeComponent
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
        private mdDialog: MatDialog
    ) { }


    @ViewChild(NoticeComponent) notice: NoticeComponent;

    @Input() ticket: Ticket;

    auto_next$ = this.workspaceService.Workspace$.map(w => w.AutoNext);

    Move() {
        const config = new MatDialogConfig();
        config.width = '450px';
        config.data = this.ticket;
        const dialog = this.mdDialog.open(TicketDetailDialog, config);
    }
i: number = 0
    Next() {
     
            if (this.ticket && this.feedbackService.CheckFeedback(this.ticket)) {
                // this.notice.ShowMessage("feedback_skip");
                const config = new MatDialogConfig();
                config.width = '750px';
                config.data = this.ticket;
                const dialog = this.mdDialog.open(FeedbackRejectlDialog, config);
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
        if ( this.feedbackService.CheckFeedback(this.ticket)) {
            // this.notice.ShowMessage("feedback_skip");
            console.log(this.ticket)
            debugger
            const config = new MatDialogConfig();
            config.width = '750px';
            config.data = this.ticket;
            const dialog = this.mdDialog.open(FeedbackRejectlDialog, config);
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

    printForm() {
        this.triggerAction('print_form');
    }

    private triggerAction(action: TicketActionName) {
        return this.ticketService.TriggerAction(action, this.ticket);
    }



}