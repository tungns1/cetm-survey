import { Injectable } from '@angular/core';
import {
  IBranch, IBoxTicketSummary, BoxTicketSummary, GlobalTicketSummary,
  MonitorNavService, MonitorFilterService
} from '../../shared';

import { MonitorTicketSocket } from './monitor-ticket.socket';
import { ReplaySubject ,  merge ,  of ,  interval } from 'rxjs';
import { share, audit, map, switchMap } from 'rxjs/operators';


class AuditAdjust {
  private last = Date.now();
  private max_wait = 8000;

  private auditInterval() {
    const now = Date.now();
    const latency = (now - this.last) / 1000;
    this.last = now;
    return Math.min(Math.round(32000 / latency), this.max_wait);
  }

  private getInterval() {
    const v = this.pending * 2000;
    this.pending = 0;
    return Math.min(v, this.max_wait);
  }

  adjust() {
    return interval(this.getInterval());
  }

  inc() {
    this.pending++;
  }

  private pending = 0;
}

@Injectable()
export class MonitorSummaryService {

  constructor(
    private socket: MonitorTicketSocket
  ) {

  }

  private initialSummary$ = this.socket.Connected$.pipe(switchMap(_ => {
    return this.Branches$.pipe(switchMap(branches => {
      return this.socket.Send<IBoxTicketSummary[]>("/summary", {
        branches
      });
    }));
  }),share());

  private summaryUpdate$ = this.socket.RxEvent<IBoxTicketSummary>("/ticket/summary/update");
  private audit = new AuditAdjust();

  summaries$ = this.initialSummary$.pipe(switchMap(initial => {
    const summaries = new GlobalTicketSummary();
    summaries.Refresh(initial);
    const summaryUpdate = this.summaryUpdate$.pipe(map(s => {
      this.audit.inc();
      summaries.Replace(s);
    }));
    return merge(of(null), summaryUpdate).pipe(map(_ => summaries));
  }),audit(e => this.audit.adjust()),share());

  Branches$ = new ReplaySubject<string[]>(1);
}
