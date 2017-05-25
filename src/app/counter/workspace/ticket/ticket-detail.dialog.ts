import { Component, ViewChild, EventEmitter, OnInit, Optional, Inject } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Ticket, TicketStates } from '../shared';
import { TicketService, QueueService, WorkspaceService } from '../shared';
import { NoticeComponent } from '../shared';

@Component({
  selector: 'ticket-detail-dialog',
  templateUrl: 'ticket-detail.dialog.html',
  styleUrls: ['ticket-detail.dialog.scss']
})
export class TicketDetailDialog {

  constructor(
    @Optional() @Inject(MD_DIALOG_DATA) public ticket: Ticket,
    private dialogRef: MdDialogRef<TicketDetailDialog>,
    private ticketService: TicketService,
    private queueService: QueueService,
    private workspaceService: WorkspaceService
  ) { }

  isServing = this.ticket.state == TicketStates.Serving;
  isCancelled = this.ticket.IsState("cancelled");

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
  canCall = this.ticket.priority.canMakeUnorderedCall() && this.ticket.state === "waiting";

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

  }

  Call() {

  }

  Restore() {

  }

  // protected ShowMessage(title: string, message: string) {
  //   const config = new MdDialogConfig();
  //   config.width = '450px';
  //   config.data = { title, message };
  //   const dialog = this.dialog.open(Alert, config);
  // }

}
