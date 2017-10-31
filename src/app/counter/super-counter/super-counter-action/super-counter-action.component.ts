import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TicketDetailDialog } from '../../workspace/ticket';
import { Ticket } from '../../../shared/model/house';
import { TicketActionName } from '../../workspace/shared'
// import { ModalComponent, Ticket, NoticeComponent } from '../shared';

// import {
//   WorkspaceService, QueueService,
//   LedService, TicketActionName,
//   TicketService, FeedbackService
// } from '../shared';

import { SuperCounterService, SupperCounterTicketService } from '../shared/service';

@Component({
  selector: 'app-super-counter-action',
  templateUrl: './super-counter-action.component.html',
  styleUrls: ['./super-counter-action.component.scss']
})
export class SuperCounterActionComponent {
  constructor(
    private superCounterService: SuperCounterService,
    private ticketService: SupperCounterTicketService,
    private mdDialog: MatDialog
  ) { }

  // @ViewChild(NoticeComponent) notice: NoticeComponent;

  @Input() ticket: Ticket;
  @Input() counterID: string;

  auto_next$ = this.superCounterService.Workspace$.map(w => w.AutoNext);

  Next() {
    this.ticketService.setCounterID(this.counterID);
    this.triggerAction("finish").subscribe(() => {
      // this.superCounterService.SetAutoNext(true);
      this.triggerAction("call")
    });
  }

  NoNext() {
    this.superCounterService.SetAutoNext(false);
  }

  Finish() {
    this.triggerAction('finish');

  }

  Miss() {

    this.triggerAction('miss');
  }

  createTicket() {
    console.log(this.counterID)
  }

  private triggerAction(action: TicketActionName) {
    return this.ticketService.TriggerAction(action, this.ticket, this.counterID);
  }

  hasMiss = false;

}