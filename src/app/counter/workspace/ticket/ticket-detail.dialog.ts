import { Component, ViewChild, EventEmitter, OnInit, Optional, Inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Ticket, TicketStates, TicketActionName } from '../shared';
import { TicketService, QueueService, WorkspaceService, FeedbackService } from '../shared';
import { NoticeComponent } from '../shared';

@Component({
  selector: 'ticket-detail-dialog',
  templateUrl: 'ticket-detail.dialog.html',
  styleUrls: ['ticket-detail.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailDialog {

  constructor(
    @Optional() @Inject(MD_DIALOG_DATA) public ticket: Ticket,
    private dialogRef: MdDialogRef<TicketDetailDialog>,
    private ticketService: TicketService,
    private feedbackService: FeedbackService,
    private queueService: QueueService,
    private workspaceService: WorkspaceService,
     private mdDialog: MdDialog
  ) { }

  isServing = this.ticket.IsState("serving");
  isCancelled = this.ticket.IsState("cancelled");
  isMissed = this.ticket.IsState("missed");
  isWaiting = this.ticket.IsState("waiting");

  checkedCounters = [];
  checkedServices = [];
  counters = this.workspaceService.counters$.combineLatest(
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
  );

  services = this.workspaceService.services$;
  canCall = (this.ticket.priority.canMakeUnorderedCall() && this.isWaiting) || this.isMissed;
  isBusy: boolean;

  @ViewChild(NoticeComponent) notice: NoticeComponent;

  ngOnInit() {
    this.queueService.busy$.subscribe(d => {
      this.isBusy = d;
    })
  }

  Move() {
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
    if (this.feedbackService.CheckFeedback(this.ticket) && this.isServing) {
        this.notice.ShowMessage("feedback_skip");
    } else {
      this.ticketService.Move(this.ticket, this.checkedServices, this.checkedCounters)
        .subscribe(v => {
          this.dialogRef.close();
        });
    }
  }

  Delete() {
    this.triggerAction("cancel");
  }

  Call() {
    this.queueService.busy$.first().subscribe(d => {
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
}
