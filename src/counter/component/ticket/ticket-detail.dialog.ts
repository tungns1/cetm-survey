import { Component, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Model, Ng } from '../../shared';

import { Move, CallFromMissed, Cancel } from '../../service/ticket';
import { PassFeedbackRequirement, ICounter, RxCounters, RxCurrentCounter, RxServices } from '../../service';
import { Serving, autoNext, ticketDialog } from '../../service/queue';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export const RxOtherCounters = new ReplaySubject<ICounter[]>(1);
const TicketStates = Model.House.TicketStates;

combineLatest<ICounter[], ICounter>(RxCounters, RxCurrentCounter).subscribe(([counters, current]) => {
  RxOtherCounters.next(counters.filter(c => c.id != current.id));
})

@Component({
  selector: 'ticket-detail-dialog',
  templateUrl: 'ticket-detail.dialog.html',
  styleUrls: ['ticket-detail.dialog.scss']
})
export class TicketDetailDialog {
  constructor() { }
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
  private counters = RxOtherCounters;
  private services = RxServices;

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

    Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
      this.Close();
    });
  }

  Recall() {
    if (Serving.RxData.value.length > 0) {
      this.ShowMessage("TITLE_MODAL", "RECALL_MISS");
      return;
    }
    CallFromMissed(this.ticket).subscribe(v => {
      autoNext.next(false);
      this.Close();
    });
  }

  Delete() {
    Cancel(this.ticket).subscribe(_ => {
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

  @ViewChild(Ng.Modal.ModalComponent) protected alert: Ng.Modal.ModalComponent;
  protected message = "";
  protected title = "";


}
