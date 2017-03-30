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
  ) { }

  private initialSummary$ = this.socket.Connected$.switchMap(_ => {
    return this.Branches$.switchMap(branches => {
      return this.socket.Send<ISummary[]>("/summary", {
        branches
      }).map(data => (data || []).map(d => new Summary(d)));
    });
  }).share();

  private summaryUpdate$ = this.socket.RxEvent<ISummary>("/summary/update").startWith(null);

  summary$ = this.initialSummary$.switchMap(initial => {
    const add = (s: ISummary) => {
      if (!s) {
        return initial;
      }
      return AddToSet(initial, new Summary(s));
    }
    return this.summaryUpdate$.map(add);
  }).share();

  Branches$ = new ReplaySubject<string[]>(1);

}

function AddToSet(arr: Summary[] = [], a: Summary) {
  var v = arr;
  var add = true;
  if (arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].branch_id === a.branch_id) {
        v.splice(i, 1);
        v.push(a);
        add = false;
        break;
      } else {
        continue;
      }
    }
  } else {
    if (add) {
      arr.push(a);
    }

  }
  return v;
}