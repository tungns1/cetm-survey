import { Injectable } from '@angular/core';
import { MonitorTicketSocket } from './monitor-ticket.socket';

import { MonitorFilterService, MonitorNavService } from '../../shared';

import {
  IActivitySummary,
  IBoxTicketSummary,
  ITicket, IBoxTicket, BoxTicket,
  CacheService, CacheCounter, CacheUsers
} from '../../../model';

import { ISubscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MonitorFocusService {

  constructor(
    private socket: MonitorTicketSocket,
    private navService: MonitorNavService
  ) {

  }

  // private ticketUpdate$ = this.socket.RxEvent<IExtendedTicket>("/ticket/update").startWith(null);
  // private summaryUpdate$ = this.socket.RxEvent<Summary>("/summary/update").startWith(null);
  // private counterUpdate$ = this.socket.RxEvent<IDevice>("/counter_track/update").startWith(null);

  private initialFocus$ = this.socket.Connected$.switchMap(_ => {
    return this.Branch$.switchMap(branch_id => {
      return this.socket.Send<IBoxTicket>("/focus", {
        branch_id
      })
    });
  }).share();

  private ticketSummaryUpdate$ = this.socket.RxEvent<IBoxTicketSummary>("/ticket/summary/update");
  private activitySummaryUpdate$ = this.socket.RxEvent<IActivitySummary>("/activity/summary/update");
  private ticketChange$ = this.socket.RxEvent<ITicket>("/ticket/update");

  Box$ = this.initialFocus$.switchMap(initial => {
    const box = new BoxTicket(initial);
    CacheCounter.Refresh(initial.counters);
    CacheUsers.Refresh(initial.users);
    const activityUpdate = this.activitySummaryUpdate$.map(a => {
      box.UpdateActivitySummary(a);
    });
    const summaryUpdate = this.ticketSummaryUpdate$.map(s => {
      box.UpdateTicketSummary(s);
    });
    const ticketUpdate = this.ticketChange$.map(t => {
      box.UpdateTicket(t);
    });
    return of(null).merge(activityUpdate, summaryUpdate, ticketUpdate)
      .map(_ => box);
  }).share().auditTime(1000).publishReplay(1).refCount();

  Unfocus() {
    this.socket.Send("/focus", {}).subscribe();
  }

  Branch$ = new ReplaySubject<string>(1);
}
