import { Injectable } from '@angular/core';
import { MonitorTicketSocket } from './monitor-ticket.socket';

import { MonitorFilterService, MonitorNavService } from '../../shared';

import {
  IExtendedTicket, ITickets, ISummary, Summary, IDevice,
  CacheCounter, CacheUsers,
  ICounter, IUser, ICustomer
} from '../../../model';

import { ReplaySubject } from 'rxjs/ReplaySubject';

interface IFocusReply {
  counters: ICounter[];
  users: IUser[];
  tickets: ITickets;
  counter_state: IDevice[];
  summary: ISummary;
}

@Injectable()
export class MonitorFocusService {

  constructor(
    private socket: MonitorTicketSocket,
    private navService: MonitorNavService
  ) { }

  private initialFocus$ = this.socket.Connected$.switchMap(_ => {
    return this.Branch$.switchMap(branch_id => {
      // console.log(branch_id);
      return this.socket.Send<IFocusReply>("/focus", {
        branch_id
      }).do(data => {
        CacheCounter.Refresh(data ? data.counters : []);
        CacheUsers.Refresh(data ? data.users : []);
      });
    });
  }).share();

  private ticketUpdate$ = this.socket.RxEvent<IExtendedTicket>("/ticket/update").startWith(null);
  private counterUpdate$ = this.socket.RxEvent<IDevice>("/counter_track/update").startWith(null);
  Branch$ = new ReplaySubject<string>(1);

  FocusSummary$ = this.initialFocus$.map(data => data.summary);


  tickets$ = this.initialFocus$
    .map(data => data ? data.tickets : {})
    .switchMap(tickets => {
      return this.ticketUpdate$.map(t => {
        if (t) {
          tickets[t.id] = t;
        }
        return tickets;
      });
    }).map(tickets => {
      return Object.keys(tickets).map(id => tickets[id]);
    }).share();


  counter$ = this.initialFocus$
    .map(data => data ? data.counter_state : [])
    .switchMap(counters => {
      return this.counterUpdate$.map(d => {
        if (d && counters.length > 0) {
          for (var i = 0; i < counters.length; i++) {
            if (counters[i].device_id === d.device_id) {
              counters[i] = d;
              break;
            }
          }
        }
        return counters;
      });
    }).share();

  Unfocus() {
    this.socket.Send("/focus", {}).subscribe();
  }

}
