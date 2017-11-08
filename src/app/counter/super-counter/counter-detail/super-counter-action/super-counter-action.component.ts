import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ITicket } from '../../../shared/model/shared';
import { TicketDetailDialog } from '../../../workspace/ticket';
import { Ticket } from '../../../../shared/model/house';
import { TicketActionName } from '../../../workspace/shared';
import { AppStorage } from '../../../shared';
import { NoticeComponent } from '../../../../../lib/ng2';
import { counterDetail } from '../../shared/model';
import { SuperCounterService, SupperCounterTicketService, QueueService, ICreateTicket } from '../../shared/service';

@Component({
  selector: 'app-super-counter-action',
  templateUrl: './super-counter-action.component.html',
  styleUrls: ['./super-counter-action.component.scss']
})
export class SuperCounterActionComponent {
  constructor(
    private superCounterService: SuperCounterService,
    private ticketService: SupperCounterTicketService
  ) { }

  @Input() ticket: Ticket;
  @Input() counter: counterDetail;

  disabled$ = this.superCounterService.Workspace$.map(c => {
    return (this.counter && this.counter.state === 'calling') || c.waiting.is_empty;
  });

  ngOnInit() {

  }

  Next() {
    if (this.counter.state !== 'calling') {
      this.triggerAction("finish", this.ticket).subscribe(() => {
        const app = this.superCounterService.AppState$.value;
        const firstWaiting = app.waiting.GetFirstTicket();
        this.triggerAction("call", firstWaiting);
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
    const service = this.superCounterService.AppState$.value.services[0];
    this.ticketService.CreateTicket(AppStorage.Culture, service.id);
  }

  private triggerAction(action: TicketActionName, ticket?: Ticket) {
    return this.ticketService.TriggerAction(action, ticket, this.counter.id);
  }

}