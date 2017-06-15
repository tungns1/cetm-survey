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
import { interval } from "rxjs/observable/interval";
import 'rxjs/add/operator/audit';

class AuditAdjust {
  private last = Date.now();
  private max_wait = 8000;
  
  private auditInterval() {
    const now = Date.now();
    const latency = (now - this.last) / 1000;
    this.last = now;
    return Math.min(Math.round(3000 / latency), this.max_wait);
  }

  adjust() {
    return interval(this.auditInterval());
  }
}

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
  private audit = new AuditAdjust();

  summaries$ = this.initialSummary$.switchMap(initial => {
    const summaries = new GlobalTicketSummary();
    summaries.Refresh(initial);
    const summaryUpdate = this.summaryUpdate$.map(s => {
      summaries.Replace(s);
    });
    return merge(of(null), summaryUpdate).map(_ => summaries);
  }).audit(e => this.audit.adjust()).share();

  Branches$ = new ReplaySubject<string[]>(1);
}
