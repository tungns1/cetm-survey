import { Component, ViewChild, EventEmitter, OnInit, Optional, Inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Ticket, TicketStates, TicketActionName } from '../shared';
import { TicketService, QueueService, WorkspaceService } from '../shared';
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
    private queueService: QueueService,
    private workspaceService: WorkspaceService
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

  @ViewChild(NoticeComponent) notice: NoticeComponent;

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

    this.ticketService.Move(this.ticket, this.checkedServices, this.checkedCounters)
      .subscribe(v => {
        this.dialogRef.close();
      });
  }

  Delete() {
    this.triggerAction("cancel");
  }

  Call() {
    this.triggerAction("call");
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
