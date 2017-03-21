import { Component, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ITicket, TicketStates, ModalComponent } from '../../shared';

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
  SetTicket(t: ITicket) {
    this.isModal = true;
    this.ticket = t;
    this.checkedCounters = [];
    this.checkedServices = [];
    this.isServing = t.state === TicketStates.Serving;
    this.isWaiting = t.state === TicketStates.Waiting;
    this.isMissed = t.state === TicketStates.Missed;

  }
  private ticket: ITicket = <any>{};
  close = new EventEmitter();

  private isServing = false;
  private isWaiting = false;
  private isMissed = false;
  private isModal = false;
  private isRemove = false;
  private isAlert = false;


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


  Move() {
    if (this.isServing) {
      if (this.checkedCounters.length < 1 && this.checkedServices.length < 1) {
        this.ShowMessage("Unsuccess", "Please, select counter or service");
        return;
      }
    } else {
      if (this.checkedCounters.length < 1) {
        this.ShowMessage("Unsuccess", "Please, select counter");
        return;
      }
    }

    this.ticketService.Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
      this.isModal = false;
    });
  }

  Recall() {
    this.queueService.busy$.first().subscribe(b => {
      if (b) {
        this.ShowMessage("Unsuccess", "Recall Miss");
        return;
      }
      this.ticketService.CallFromMissed(this.ticket).subscribe(v => {
        this.ticketService.SetAutoNext(false);
        this.isModal = false;
      });
    });
  }
  OpenRemove() {
    this.isRemove = true;
  }
  CloseRmove() {
    this.isRemove = false;
  }
  Close() {
    this.isModal = false;
  }

  Delete() {
    this.ticketService.Cancel(this.ticket).subscribe(_ => {
      // toastr.success("Delete success counter");
      this.isRemove = false;
      this.isModal = false;
    }, err => {
    });
  }

  protected ShowMessage(title: string, message: string) {
    this.message = message;
    this.title = title;
    this.isAlert = true;
  }
  CloseAlert() {
    this.isAlert = false;
  }


  @ViewChild(ModalComponent) protected alert: ModalComponent;
  @ViewChild(ModalComponent) protected remove: ModalComponent;
  protected message = "";
  protected title = "";


}
