import { Component, ViewContainerRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Model } from '../shared';

import { Move, CallFromMissed, Cancel } from '../backend/ticket';
import { RxCounters } from '../backend/index';
import { Serving } from '../backend/queue';

@Component({
  selector: 'ticket-detail-dialog',
  templateUrl: 'ticket-detail.dialog.html',
  styleUrls: ['ticket-detail.dialog.css']
})
export class TicketDetailDialog {
  constructor() { }

  SetTicket(t: Model.House.ITicket) {
    this.ticket = t;
    // this.checkedCounters = Array.from(t.counters || []);
    // this.checkedServices = Array.from(t.services || []);
    this.isServing = t.state === Model.House.TicketStateServing;
    this.isWaiting = t.state === Model.House.TicketStateWaiting;
    this.isMissed = t.state === Model.House.TicketStateMissed;
  }

  private ticket: Model.House.ITicket = <any>{};
  close = new EventEmitter();


  private isServing = false;
  private isWaiting = false;
  private isMissed = false;

  private checkedCounters = [];
  private checkedServices = [];
  private counters = RxCounters;
  private services = Model.Center.RxServices;

  Close() {
    this.close.emit(true);
  }

  Move() {
    if (this.isMissed) {
      if (this.checkedCounters.length>0 && this.checkedServices.length>0) {
        Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
          this.Close();
        });
      }else{
        alert("Bạn phải chọn quầy và dịch vụ");
      }

    } else {
      if (this.checkedCounters.length>0) {
        Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
          this.Close();
        });
      }else{
         alert("Bạn phải chọn quầy");
      }
    }

  }

  Recall() {
    if (Serving.RxData.value.length > 0) {
      alert("Bạn phải kết thúc vé đang thực hiện");
      return;
    }
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
