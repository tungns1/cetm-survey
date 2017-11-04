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
  @ViewChild(NoticeComponent) notice: NoticeComponent;

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
      if (nextTicket)
        this.triggerAction("call", nextTicket);
      else {
        this.notice.ShowMessage("out_of_ticket");
      }
    });
  }

  NoNext() {
    this.superCounterService.SetAutoNext(false);
  }

  Finish() {
    this.triggerAction('finish', this.ticket);

  }

  Cancel() {
    this.triggerAction('cancel', this.ticket);
  }

  createTicket() {
    let serviceID: string;
    this.superCounterService.serviceList$.first().subscribe(d => {
      serviceID = d[0]['id']
    })
    const info: ICreateTicket = {
      lang: AppStorage.Culture,
      service_id: serviceID
    }
    this.ticketService.createTicket('create', info)
  }

  private triggerAction(action: TicketActionName, ticket?: Ticket) {
    return this.ticketService.TriggerAction(action, ticket, this.counterID);
  }

  // hasMiss = false;

}