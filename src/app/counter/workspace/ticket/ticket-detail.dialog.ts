import { Component, ViewChild, EventEmitter, OnInit, Optional, Inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {
    Ticket, TicketStates, TicketActionName,
    TicketService, QueueService, WorkspaceService,
    FeedbackService, NoticeComponent
} from '../shared';
import { FeedbackRejectlDialog } from './feedback-reject.dialog';
import { combineLatest, first } from 'rxjs/operators';
export interface Feedback {
    reason_text: string
}

@Component({
    selector: 'ticket-detail-dialog',
    templateUrl: 'ticket-detail.dialog.html',
    styleUrls: ['ticket-detail.dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailDialog {

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public ticket: Ticket,
        private dialogRef: MatDialogRef<TicketDetailDialog>,
        private ticketService: TicketService,
        private feedbackService: FeedbackService,
        private queueService: QueueService,
        private workspaceService: WorkspaceService,
        private mdDialog: MatDialog
    ) { }

    isServing = this.ticket.IsState("serving");
    isCancelled = this.ticket.IsState("cancelled");
    isMissed = this.ticket.IsState("missed");
    isWaiting = this.ticket.IsState("waiting");
    t: Ticket;
    checkedCounters = [];
    checkedServices = [];
    counters = this.workspaceService.counters$.pipe(combineLatest(
        this.workspaceService.currentCounter$,
        (counters, currentCounter) => {
            return counters.filter(c => c.id !== currentCounter.id)
                .sort((a, b) => {
                    if (a.name.length === b.name.length) {
                        return a.name < b.name ? -1 : 1;
                    }
                    return a.name.length < b.name.length ? -1 : 1;
                });
        }
    ));
    curentCounter;

    services = this.workspaceService.services$;
    canCall = (this.ticket.priority.canMakeUnorderedCall() && this.isWaiting) || this.isMissed;
    isBusy: boolean;

    @ViewChild(NoticeComponent) notice: NoticeComponent;

    ngOnInit() {
        this.workspaceService.currentCounter$.subscribe(v => {
            this.curentCounter = v
        })
        this.queueService.busy$.subscribe(d => {
            this.isBusy = d;
        })
        this.queueService.serving$.subscribe(v => {
            this.t = v[0]
        })
    }
    feedback: Feedback
    Move() {
        if (this.isWaiting) {
            if (this.checkedServices.length < 1) {
                this.notice.ShowMessage("missing_service");
                return;
            }
            let counter = this.checkedCounters.length > 0 ? this.checkedCounters : [this.curentCounter.id]
            this.ticketService.Move(this.ticket, this.checkedServices, this.checkedCounters)
                .subscribe(v => {
                    this.dialogRef.close();
                    return;
                });
        } else {

            if (this.isServing) {
                if (this.checkedCounters.length < 1 && this.checkedServices.length < 1) {
                    this.notice.ShowMessage("missing_counter_or_service");
                    return;
                }
            } else {
                if (this.checkedCounters.length < 1) {
                    this.notice.ShowMessage("missing_counter");
                    return;
                }
            }
            if (this.isServing) {

                if (this.feedbackService.CheckFeedback(this.t)) {
                    const config = new MatDialogConfig();
                    config.width = '750px';
                    config.data = this.ticket;
                    const dialog = this.mdDialog.open(FeedbackRejectlDialog, config);
                    dialog.afterClosed().subscribe(d => {
                        if (d) {
                            this.ticket = d;
                            this.ticketService.Move(this.ticket, this.checkedServices, this.checkedCounters)
                                .subscribe(v => {
                                    this.dialogRef.close();
                                });
                        }
                    })
                } else {
                    this.ticketService.Move(this.ticket, this.checkedServices, this.checkedCounters)
                        .subscribe(v => {
                            this.dialogRef.close();
                        });
                }
            } else {
                this.ticketService.Move(this.ticket, this.checkedServices, this.checkedCounters)
                    .subscribe(v => {
                        this.dialogRef.close();
                    });
            }
        }



    }

    Delete() {
        this.triggerAction("cancel");
    }

    Call() {
        this.queueService.busy$.pipe(first()).subscribe(d => {
            if (d) {
                this.notice.ShowMessage('serving');
            } else this.triggerAction("call");
        })
    }

    Restore() {
        this.triggerAction("restore");
    }

    private triggerAction(action: TicketActionName) {
        this.ticketService.TriggerAction(action, this.ticket)
            .subscribe(_ => this.dialogRef.close(), e => {
                this.notice.ShowMessage("server_error");
            });
    }

    close() {
        this.dialogRef.close();
    }
}
