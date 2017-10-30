import { Injectable } from '@angular/core';
import { ITicket, Ticket, IService, TicketState, TicketStates } from '../../workspace/shared';
import { QueueService, SuperCounterService } from '../service'
import { TicketActionName, CounterSettingService } from '../../workspace/shared';
import { QmsService } from '../../workspace/shared/shared';
import { ActionManager, TicketAction } from '../../workspace/shared/service/shared';

@Injectable()
export class SupperCounterTicketService {
  constructor(
    private superCounterService: SuperCounterService,
    private settingService: CounterSettingService,
    private qms: QmsService,
    // private queueService: QueueService
  ) {
    // this.onInit();
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

  Search(cnum: string) {
    return this.socket.Send<ITicket[]>('/search', {
      cnum: cnum
    });
  }

  // private onInit() {
  //   let failed_count = 0;
  //   this.superCounterService.Workspace$.subscribe(w => {
  //     if (!w.AutoNext) return;
  //     if (w.is_busy) {
  //       this.superCounterService.SetAutoNext(false);
  //       return;
  //     }
  //     const t = w.Waiting.GetFirstTicket();
  //     if (!t) return;

  //     const lastQueueUpdate = w.LastUpdate;
  //     this.TriggerAction("call", t).subscribe(_ => {
  //       failed_count = 0;
  //     }, e => {
  //       // call failed
  //       const ten_second = 10 * 1000;
  //       failed_count++;
  //       setTimeout(_ => {
  //         // the workspace was not updated
  //         if (w.LastUpdate <= lastQueueUpdate) {
  //           console.log("the workspace was not updated");
  //           this.superCounterService.Socket.reset();
  //         }
  //       }, ten_second);
  //     });
  //   });
  // }

  TriggerAction(action: TicketActionName, ticket: Ticket, counterID: string) {
    return this.manager.Work(action, ticket, {
      record_transaction: this.settingService.EnableRecordTransaction,
      platform: this.platform,
    }, counterID);
  }
}