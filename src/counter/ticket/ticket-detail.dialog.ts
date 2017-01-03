import { Component, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Model } from '../shared';

import { Move, CallFromMissed, Cancel } from '../backend/ticket';
import { PassFeedbackRequirement, ICounter, RxCounters, RxCurrentCounter, RxServices } from '../backend/';
import { Serving, autoNext } from '../backend/queue';
import { ModalComponent } from '../../x/ui/modal';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export const RxOtherCounters = new ReplaySubject<ICounter[]>(1);

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
      if (!PassFeedbackRequirement(this.ticket)) {
        this.ShowMessage("Bản phải nhắc khách háng phản hồi");
        return;
      }else{
        this.Close();
      }
      if (this.checkedCounters.length < 1 && this.checkedServices.length < 1) {
        this.ShowMessage("Bạn phải chọn quầy hoặc dịch vụ");
        return;
      }
    } else {
      if (this.checkedCounters.length < 1) {
        this.ShowMessage("Bạn phải chọn quầy");
        return;
      }
    }

    Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
      this.Close();
    });
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
