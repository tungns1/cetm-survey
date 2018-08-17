import { Injectable } from '@angular/core';
import { MonitorTicketSocket } from './monitor-ticket.socket';

import { MonitorFilterService, MonitorNavService } from '../../shared';

import {
  IActivitySummary,
  IBoxTicketSummary,
  ITicket, IBoxTicket, BoxTicket,
  CacheService, CacheCounter, CacheUsers
} from '../../../model';

import { SubscriptionLike as ISubscription ,  ReplaySubject ,  of } from 'rxjs';
import { share, auditTime, publishReplay, refCount, merge, map, switchMap } from 'rxjs/operators';

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

  private initialFocus$ = this.socket.Connected$.pipe(switchMap(_ => {
    return this.Branch$.pipe(switchMap(branch_id => {
      return this.socket.Send<IBoxTicket>("/focus", {
        branch_id
      })
    }));
  }),share());

  private ticketSummaryUpdate$ = this.socket.RxEvent<IBoxTicketSummary>("/ticket/summary/update");
  private activitySummaryUpdate$ = this.socket.RxEvent<IActivitySummary>("/activity/summary/update");
  private ticketChange$ = this.socket.RxEvent<ITicket>("/ticket/update");

  Box$ = this.initialFocus$.pipe(switchMap(initial => {
    const box = new BoxTicket(initial);
    CacheCounter.Refresh(initial.counters);
    CacheUsers.Refresh(initial.users);
    const summaryUpdate = this.ticketSummaryUpdate$.pipe(map(s => {
      box.UpdateTicketSummary(s);
    }));
    const ticketUpdate = this.ticketChange$.pipe(map(t => {
      box.UpdateTicket(t);
    }));
    return of(null).pipe(merge(summaryUpdate, ticketUpdate)
      ,map(_ => box));
  }),share(),auditTime(1000),publishReplay(1),refCount());

  Unfocus() {
    this.socket.Send("/focus", {}).subscribe();
  }

  Branch$ = new ReplaySubject<string>(1);
}
