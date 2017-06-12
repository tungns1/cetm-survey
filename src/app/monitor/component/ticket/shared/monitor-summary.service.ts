import { Injectable } from '@angular/core';
import {
  IBranch, IBoxTicketSummary, BoxTicketSummary, GlobalTicketSummary,
  MonitorNavService, MonitorFilterService
} from '../../shared';

import { MonitorTicketSocket } from './monitor-ticket.socket';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class MonitorSummaryService {

  constructor(
    private socket: MonitorTicketSocket
  ) {

  }



  private initialSummary$ = this.socket.Connected$.switchMap(_ => {
    return this.Branches$.switchMap(branches => {
      return this.socket.Send<IBoxTicketSummary[]>("/summary", {
        branches
      });
    });
  }).share();

  private summaryUpdate$ = this.socket.RxEvent<IBoxTicketSummary>("/ticket/summary/update");

  summaries$ = this.initialSummary$.switchMap(initial => {
    const summaries = new GlobalTicketSummary();
    summaries.Refresh(initial);
    const summaryUpdate = this.summaryUpdate$.map(s => {
      summaries.Replace(s);
    });
    return merge(of(null), summaryUpdate).map(_ => summaries);
  }).auditTime(6000).share();

  Branches$ = new ReplaySubject<string[]>(1);
}
