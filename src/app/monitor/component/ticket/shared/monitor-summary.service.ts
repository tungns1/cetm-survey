import { Injectable } from '@angular/core';
import {
  IBranch, IBoxTicketSummary, BoxTicketSummary, GlobalTicketSummary,
  MonitorNavService, MonitorFilterService
} from '../../shared';

import { MonitorTicketSocket } from './monitor-ticket.socket';
import { ReplaySubject } from 'rxjs/ReplaySubject';

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

  private summaryUpdate$ = this.socket.RxEvent<IBoxTicketSummary>("/ticket/summary/update").startWith(null);

  summaries$ = this.initialSummary$.switchMap(initial => {
    const summaries = new GlobalTicketSummary();
    summaries.Refresh(initial);
    return this.summaryUpdate$.startWith(null).map(s => {
      summaries.Replace(s);
      return summaries;
    });
  }).share();

  Branches$ = new ReplaySubject<string[]>(1);
}
