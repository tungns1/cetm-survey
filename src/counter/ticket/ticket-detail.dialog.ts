import { Component, ViewContainerRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Model } from '../shared';

import {
  Move, TicketStateServing, TicketStateWaiting, TicketStateMissed, CallFromMissed, Cancel
} from '../backend/ticket';
import { RxCounters, RxServices } from '../backend/index';

@Component({
  selector: 'ticket-detail-dialog',
  templateUrl: 'ticket-detail.dialog.html',
  styleUrls: ['ticket-detail.dialog.css']
})
export class TicketDetailDialog {
  constructor() { }

  SetTicket(t: Model.ITicket) {
    this.ticket = t;
    this.checkedCounters = Array.from(t.counters);
    this.checkedServices = Array.from(t.services);
    this.isServing = t.state === TicketStateServing;
    this.isWaiting = t.state === TicketStateWaiting;
    this.isMissed = t.state === TicketStateMissed;
  }

  private ticket: Model.ITicket = <any>{};
  close = new EventEmitter();


  private isServing = false;
  private isWaiting = false;
  private isMissed = false;

  private checkedCounters = [];
  private checkedServices = [];
  private counters = RxCounters;
  private services = RxServices;
  
  Close() {
    this.close.emit(true);
  }

  Move() {
    Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
      this.Close();
    });
  }

  Recall() {
    // if (servingTickets.value.length > 0) {
    //   alert("Bạn phải kết thúc vé đang thực hiện");
    //   return;
    // }
    CallFromMissed(this.ticket).subscribe(v => {
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

}
