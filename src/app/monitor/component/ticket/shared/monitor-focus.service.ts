import { Injectable } from '@angular/core';
import { MonitorTicketSocket } from './monitor-ticket.socket';

import { MonitorFilterService, MonitorNavService } from '../../shared';

import {
  IExtendedTicket, ITickets, ISummary, Summary, IDevice,
  CacheCounter, CacheUsers,
  ICounter, IUser, ICustomer
} from '../../../model';

import { ISubscription } from 'rxjs/Subscription';
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
  ) {

  }

  private subscription: ISubscription;

  private initialFocus$ = new ReplaySubject<IFocusReply>(1);

  private ticketUpdate$ = this.socket.RxEvent<IExtendedTicket>("/ticket/update").startWith(null);
  private summaryUpdate$ = this.socket.RxEvent<Summary>("/summary/update").startWith(null);
  private counterUpdate$ = this.socket.RxEvent<IDevice>("/counter_track/update").startWith(null);


  enable() {
    this.subscription = this.Branch$.switchMap(branch_id => {
      return this.socket.Connected$.switchMap(_ => {
        return this.Focus(branch_id);
      });
    }).do(data => {
      CacheCounter.Refresh(data ? data.counters : []);
      CacheUsers.Refresh(data ? data.users : []);
    }).subscribe(data => this.initialFocus$.next(data))
  }

  disable() {
    this.subscription.unsubscribe();
  }

  Branch$ = new ReplaySubject<string>(1);

  FocusSummary$ = this.initialFocus$
    .map(data => {
      // console.log(data);`
      return data.summary;})
    .switchMap(summary => {
      return this.summaryUpdate$.map(t => {
        if (t) {
          summary = t;
        }
        return summary;
      });
    })
    .map(d => {
      return new Summary(d);
    });


  tickets$ = this.initialFocus$
    .map(data => data ? data.tickets : {})
    .switchMap(tickets => {
      return this.ticketUpdate$.map(t => {
        if (t) {
          tickets[t.id] = t;
        }
        return tickets;
      });
    })
    .map(tickets => {
      return Object.keys(tickets).map(id => tickets[id]);
    });

  counterState$ = this.initialFocus$
    .switchMap(data => {
      const states = data.counter_state;
      const map: { [index: string]: IDevice } = {};
      states.forEach(s => map[s.device_id] = s);
      return this.counterUpdate$.map(d => {
        if (d) {
          states[d.device_id] = d;
        }
        return Object.keys(map).map(v => map[v]);
      });
    });

  private Focus(branch_id: string) {
    return this.socket.Send<IFocusReply>("/focus", {
      branch_id
    });
  }
}
