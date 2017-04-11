import { Injectable } from '@angular/core';
import {
  ISummary, Summary, IBranch,
  MonitorNavService, MonitorFilterService
} from '../../shared';

import { MonitorTicketSocket } from './monitor-ticket.socket';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class MonitorSummaryService {

  constructor(
    private socket: MonitorTicketSocket
  ) {
    this.onInit();
  }

  onInit() {
    this.Branches$.switchMap(branches => {
      return this.socket.Connected$.switchMap(_ => {
        return this.orderSummary(branches);
      });
    }).subscribe(data => {
      const map = new Map<string, Summary>();
      if(data) {
        data.forEach(d => map.set(d.branch_id, new Summary(d)));
        this.initialSummary$.next(map);
      }
    });
  }

  private orderSummary(branches: string[]) {
    return this.socket.Send<ISummary[]>("/summary", {
      branches
    })
  }

  private initialSummary$ = new ReplaySubject<Map<string, Summary>>(1);

  private summaryUpdate$ = this.socket.RxEvent<ISummary>("/summary/update").startWith(null);

  summary$ = this.initialSummary$.switchMap(initial => {
    return this.summaryUpdate$.map((s: ISummary) => {
      if (s) {
        initial.set(s.branch_id, new Summary(s));
      }
      return Array.from(initial.values());
    });
  }).share();

  Branches$ = new ReplaySubject<string[]>(1);
}
