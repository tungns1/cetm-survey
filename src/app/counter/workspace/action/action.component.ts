import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TicketDetailDialog } from '../ticket';
import { FeedbackRejectlDialog } from '../ticket/feedback-reject.dialog';
import {
    WorkspaceService, TicketActionName, TicketService, 
    FeedbackService, Ticket, NoticeComponent, ITicket
} from '../shared';
import { map, first, share } from 'rxjs/operators';

@Component({
    selector: 'ticket-action',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.scss']
})
export class ActionComponent {
    constructor(
        private workspaceService: WorkspaceService,
        private ticketService: TicketService,
        private feedbackService: FeedbackService,
        private mdDialog: MatDialog
    ) { }

    @ViewChild(NoticeComponent) notice: NoticeComponent;

    @Input() ticket: Ticket;

    @Input() nextTicket: Ticket;

    @Input() selectedService;

    private socket = this.workspaceService.Socket;

    auto_next$ = this.workspaceService.Workspace$.pipe(map(w => w.AutoNext));

    Move() {
        const config = new MatDialogConfig();
        config.width = '450px';
        config.data = this.ticket;
        const dialog = this.mdDialog.open(TicketDetailDialog, config);
    }

    Next() {
        if (this.ticket && this.feedbackService.CheckFeedback(this.ticket)) {
            const config = new MatDialogConfig();
            config.width = '520px';
            config.data = this.ticket;
            const dialog = this.mdDialog.open(FeedbackRejectlDialog, config);
            dialog.afterClosed().subscribe(d => {
                if (d) {
                    this.ticket = d;
                    this.triggerAction("finish").pipe(first()).subscribe(() => {
                        this.workspaceService.SetAutoNext(true);
                    });
                    this.triggerAction('next_ticket', this.nextTicket)

                }
            })
        } else {
            this.triggerAction("finish").pipe(first()).subscribe(() => {
                this.workspaceService.SetAutoNext(true);
            });
            this.triggerAction('next_ticket', this.nextTicket)
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
            const config = new MatDialogConfig();
            config.width = '520px';
            config.data = this.ticket;
            const dialog = this.mdDialog.open(FeedbackRejectlDialog, config);
            dialog.afterClosed().subscribe(d => {
                if (d) {
                    this.ticket = d;
                    this.triggerAction('finish');
                    this.triggerAction('next_ticket', this.nextTicket)
                }
            })
        } else {
            this.triggerAction('finish');
            this.triggerAction('next_ticket', this.nextTicket)
        }
    }

    Delete() {
        this.triggerAction('cancel');
        this.triggerAction('next_ticket', this.nextTicket)
    }

    Miss() {
        this.triggerAction('miss');
    }

    printForm() {
        this.triggerAction('print_form');
    }

    private triggerAction(action: TicketActionName, ticket = this.ticket) {
        return this.ticketService.TriggerAction(action, ticket);
    }

}