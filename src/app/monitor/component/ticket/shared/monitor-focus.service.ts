import { Injectable } from '@angular/core';
import { MonitorTicketSocket } from './monitor-ticket.socket';

import { MonitorFilterService, MonitorNavService } from '../../shared';

import {
  IActivitySummary, IBoxTicket, BoxTicket
} from '../../../model';

import { ISubscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';

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

  private activitySummaryUpdate$ = this.socket.RxEvent<IActivitySummary>("/activity/summary/update").startWith(null);

  Box$ = this.initialFocus$.switchMap(initial => {
    const box = new BoxTicket(initial);
    return this.activitySummaryUpdate$.startWith(null).map(a => {
      box.UpdateActivitySummary(a);
      return box;
    });
  }).share();

  Unfocus() {
    this.socket.Send("/focus", {}).subscribe();
  }

  Branch$ = new ReplaySubject<string>(1);
}
