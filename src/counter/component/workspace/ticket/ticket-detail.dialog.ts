import { Component, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Model, Ng, TicketStates } from '../../shared';

import { combineLatest } from 'rxjs/observable/combineLatest';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { TicketService, QueueService, WorkspaceService } from '../service';

@Component({
  selector: 'ticket-detail-dialog',
  templateUrl: 'ticket-detail.dialog.html',
  styleUrls: ['ticket-detail.dialog.scss']
})
export class TicketDetailDialog {


  constructor(
    private ticketService: TicketService,
    private queueService: QueueService,
    private workspaceService: WorkspaceService
  ) { }
  SetTicket(t: Model.House.ITicket) {
    this.ticket = t;
    this.checkedCounters = [];
    this.checkedServices = [];
    this.isServing = t.state === TicketStates.Serving;
    this.isWaiting = t.state === TicketStates.Waiting;
    this.isMissed = t.state === TicketStates.Missed;
  }
  private ticket: Model.House.ITicket = <any>{};
  close = new EventEmitter();

  private isServing = false;
  private isWaiting = false;
  private isMissed = false;

  private checkedCounters = [];
  private checkedServices = [];
  private counters = this.workspaceService.counters$.combineLatest(
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

  private services = this.workspaceService.services$;

  Close() {
    this.close.emit(true);
  }

  Move() {
    if (this.isServing) {
      if (this.checkedCounters.length < 1 && this.checkedServices.length < 1) {
        this.ShowMessage("TITLE_MODAL", "CONTENT_MOVE_TICKET_SERVING");
        return;
      }
    } else {
      if (this.checkedCounters.length < 1) {
        this.ShowMessage("TITLE_MODAL", "CONTENT_MOVE_TICKET_WAITTING_OR_MISS");
        return;
      }
    }

    this.ticketService.Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
      this.Close();
    });
  }

  Recall() {
    this.queueService.busy$.first().subscribe(b => {
      if (b) {
        this.ShowMessage("TITLE_MODAL", "RECALL_MISS");
        return;
      }
      this.ticketService.CallFromMissed(this.ticket).subscribe(v => {
        this.ticketService.SetAutoNext(false);
        this.Close();
      });
    });
  }

  Delete() {
    this.ticketService.Cancel(this.ticket).subscribe(_ => {
      // toastr.success("Delete success counter");
      this.Close();
    }, err => {
      // toastr.error(err.error);
    });;
  }

  protected ShowMessage(title: string, message: string) {
    this.message = message;
    this.title = title;
    this.alert.Open();
  }

  @ViewChild(Ng.ModalComponent) protected alert: Ng.ModalComponent;
  @ViewChild(Ng.ModalComponent) protected remove: Ng.ModalComponent;
  protected message = "";
  protected title = "";


}
