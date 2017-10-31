import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ITicket } from '../../shared/model/shared';
import { TicketDetailDialog } from '../../workspace/ticket';
import { Ticket } from '../../../shared/model/house';
import { TicketActionName } from '../../workspace/shared'
// import { ModalComponent, Ticket, NoticeComponent } from '../shared';

// import {
//   WorkspaceService, QueueService,
//   LedService, TicketActionName,
//   TicketService, FeedbackService
// } from '../shared';

import { SuperCounterService, SupperCounterTicketService, QueueService } from '../shared/service';

@Component({
  selector: 'app-super-counter-action',
  templateUrl: './super-counter-action.component.html',
  styleUrls: ['./super-counter-action.component.scss']
})
export class SuperCounterActionComponent {
  constructor(
    private superCounterService: SuperCounterService,
    private ticketService: SupperCounterTicketService,
    private queueService: QueueService,
    private mdDialog: MatDialog
  ) { }

  // @ViewChild(NoticeComponent) notice: NoticeComponent;

  @Input() ticket: Ticket;
  @Input() counterID: string;

  auto_next$ = this.superCounterService.Workspace$.map(w => w.AutoNext);

  ngOnInit() {
  }

  Next() {
    this.ticketService.setCounterID(this.counterID);
    this.triggerAction("finish", this.ticket).subscribe(() => {
      let nextTicket: Ticket;
      this.queueService.waiting$.first().subscribe(ticket => {
        nextTicket = ticket.GetFirstTicket();
      });
      this.triggerAction("call", nextTicket);
    });
  }

  NoNext() {
    this.superCounterService.SetAutoNext(false);
  }

  Finish() {
    this.triggerAction('finish');

  }

  Cancel() {

    this.triggerAction('cancel');
  }

  createTicket() {
    console.log(this.counterID)
  }

  private triggerAction(action: TicketActionName, ticket?: Ticket) {
    return this.ticketService.TriggerAction(action, ticket, this.counterID);
  }

  hasMiss = false;

}