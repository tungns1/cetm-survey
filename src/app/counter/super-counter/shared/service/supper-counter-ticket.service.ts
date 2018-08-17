import { Injectable } from '@angular/core';
import {
  ITicket, Ticket, IService,
  TicketState, TicketStates, TicketActionName,
} from '../../../workspace/shared';
import { QueueService } from './queue.service';
import { SuperCounterService } from './super-counter.service';
import { QmsService } from '../../../workspace/shared/shared';
import { ActionManager, TicketAction } from '../../../workspace/shared/service/shared';
import { share } from 'rxjs/operators';

export interface ICreateTicket {
  lang: string;
  service_id: string;
}

@Injectable()
export class SupperCounterTicketService {
  constructor(
    private superCounterService: SuperCounterService,
    private qms: QmsService
  ) {
    this.onInit();
  }

  private socket = this.superCounterService.Socket;
  private platform = this.qms.platform || "other";

  private sendAction(body: TicketAction) {
    const data = <TicketAction>{
      action: body.action,
      ticket_id: body.ticket_id,
      state: body.state,
      service_id: body.service_id,
      counter_id: body.counter_id,
      extra: body.extra
    }

    return this.socket.Send<ITicket>("/ticketsuper", data).pipe(share());
  }

  private manager = new ActionManager((ta: TicketAction) => {
    return this.sendAction(ta);
  });

  Search(cnum: string) {
    return this.socket.Send<ITicket[]>('/search', {
      cnum: cnum
    });
  }

  private onInit() {
    let failed_count = 0;
  }

  TriggerAction(action: TicketActionName, ticket: Ticket, counterID?: string) {
    return this.manager.Work(action, ticket, {
      platform: this.platform,
    }, counterID);
  }

  CreateTicket(lang: string, service_id: string) {
    // return this.manager.create(action, info);
    const data = {
      action: 'create',
      lang,
      service_id
    }
    return this.socket.Send<ICreateTicket>("/create_ticket", data).pipe(share());
  }

}