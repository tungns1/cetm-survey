import { Component, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Model } from '../shared';

import { Move, CallFromMissed, Cancel } from '../backend/ticket';
import { RxOtherCounters, RxServices } from '../backend/index';
import { Serving, autoNext } from '../backend/queue';
import {ModalComponent} from '../../x/ui/modal';

@Component({
  selector: 'ticket-detail-dialog',
  templateUrl: 'ticket-detail.dialog.html',
  styleUrls: ['ticket-detail.dialog.scss']
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
  private counters = RxOtherCounters;
  private services = RxServices;

  Close() {
    this.close.emit(true);
  }

  Move() {
    if (this.isServing) {
      if (this.checkedCounters.length > 0 || this.checkedServices.length > 0) {
        Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
          this.Close();
        });
      } else {
        this.ShowMessage("Bạn phải chọn quầy hoặc dịch vụ");
      }

    } else {
      if (this.checkedCounters.length > 0) {
        Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
          this.Close();
        });
      } else {
        this.ShowMessage("Bạn phải chọn quầy");
      }
    }

  }

  Recall() {
    if (Serving.RxData.value.length > 0) {
      this.ShowMessage("Bạn phải kết thúc vé đang thực hiện");
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

  protected ShowMessage(message: string) {
    this.message = message;
    this.alert.Open();
  }

  @ViewChild(ModalComponent) protected alert: ModalComponent;
  protected message = "";

}
