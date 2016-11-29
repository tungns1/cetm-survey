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

  ticket: Model.ITicket = <any>{};
  close = new EventEmitter();


  get isServing() {
    return this.ticket.state == TicketStateServing;
  }

  get isWaiting() {
    return this.ticket.state == TicketStateWaiting;
  }

  get isMissed() {
    return this.ticket.state == TicketStateMissed;
  }


  checkedCounters = [];
  checkedServices = [];
  counters = RxCounters;
  services = RxServices;
  
  Close() {
    this.close.emit(true);
  }

  Move() {
    Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
      console.log(v);
      this.Close();
    });
  }

  Recall(t) {
    // if (servingTickets.value.length > 0) {
    //   alert("Bạn phải kết thúc vé đang thực hiện");
    //   return;
    // }
    CallFromMissed(t).subscribe(v => {
      console.log(v);
      this.Close();
    });
  }

  Delete(t) {
    Cancel(t).subscribe(_ => {
      // toastr.success("Delete success counter");
      this.Close();
    }, err => {
      // toastr.error(err.error);
    });;
  }

}
