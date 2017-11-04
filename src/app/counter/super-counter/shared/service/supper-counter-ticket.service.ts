import { Injectable } from '@angular/core';
import {
  ITicket, Ticket, IService,
  TicketState, TicketStates, TicketActionName,
} from '../../../workspace/shared';
import { QueueService } from './queue.service';
import { SuperCounterService } from './super-counter.service';
import { QmsService } from '../../../workspace/shared/shared';
import { ActionManager, TicketAction } from '../../../workspace/shared/service/shared';

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

    return this.socket.Send<ITicket>("/ticketsuper", data).share();
  }

  private manager = new ActionManager((ta: TicketAction) => {
    return this.sendAction(ta);
  });

  counterID: string = '';

  setCounterID(counterID: string) {
    this.counterID = counterID;
  }

  Search(cnum: string) {
    return this.socket.Send<ITicket[]>('/search', {
      cnum: cnum
    });
  }

  private onInit() {
    let failed_count = 0;
    this.superCounterService.Workspace$.subscribe(w => {
      if (!w.AutoNext) return;

      const ticket = w.waiting.GetFirstTicket();
      if (!ticket) return;

      this.TriggerAction("call", ticket, this.counterID).subscribe(_ => {
        failed_count = 0;
      }, e => {
        // call failed
        const ten_second = 10 * 1000;
        failed_count++;
        setTimeout(_ => {
          console.log('error')
        }, ten_second);
      });
    });
  }

  TriggerAction(action: TicketActionName, ticket: Ticket, counterID?: string) {
    return this.manager.Work(action, ticket, {
      platform: this.platform,
    }, counterID);
  }

  createTicket(action: TicketActionName, info: ICreateTicket) {
    // return this.manager.create(action, info);
    const data = {
      action: action,
      lang: info.lang,
      service_id: info.service_id
    }
    return this.socket.Send<ICreateTicket>("/create_ticket", data).share();
  }

}