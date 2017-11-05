import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ITicket } from '../../shared/model/shared';
import { TicketDetailDialog } from '../../workspace/ticket';
import { Ticket } from '../../../shared/model/house';
import { TicketActionName } from '../../workspace/shared';
import { AppStorage } from '../../shared';
import { NoticeComponent } from '../../../../lib/ng2';

import { SuperCounterService, SupperCounterTicketService, QueueService, ICreateTicket } from '../shared/service';

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

  @Input() ticket: Ticket;
  @Input() counterID: string;

  disabled$ = this.superCounterService.Workspace$.map(c => {
    return c.counterList.selectedCounter.state === 'calling' || c.waiting.is_empty;
  });

  ngOnInit() {

  }

  Next() {
    if (this.superCounterService.SelectedCounter$.value.state !== 'calling') {
      this.triggerAction("finish", this.ticket).subscribe(() => {
        this.queueService.waiting$.first().subscribe(ticket => {
          let nextTicket: Ticket;
          nextTicket = ticket.GetFirstTicket();
          this.triggerAction("call", nextTicket);
        });
      });
    }
  }

  Finish() {
    this.triggerAction('finish', this.ticket);

  }

  Cancel() {
    this.triggerAction('cancel', this.ticket);
  }

  createTicket() {
    this.superCounterService.serviceList$.first().subscribe(d => {
      const serviceID = d[0]['id'];
      this.ticketService.CreateTicket(AppStorage.Culture, serviceID);
    });
  }

  private triggerAction(action: TicketActionName, ticket?: Ticket) {
    return this.ticketService.TriggerAction(action, ticket, this.counterID);
  }

}