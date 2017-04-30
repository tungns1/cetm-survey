import { Injectable } from '@angular/core';
import {
  IDevice, ICountState, DeviceCount,
  IBoxActivitySummary, GlobalActivitySummary,
  IActivitySummary, ActivitySummary
} from '../../shared';

import { MonitorDeviceSocket } from './monitor-device.socket';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class MonitorSummaryService {

  constructor(
    private socket: MonitorDeviceSocket
  ) { }

  private initialSummary$ = this.socket.Connected$.switchMap(_ => {
    return this.Branches$.switchMap(branches => {
      return this.socket.Send<IBoxActivitySummary[]>("/summary", {
        branches
      });
    });
  }).share();

  private activitySummaryUpdate$ = this.socket.RxEvent<IActivitySummary>("/activity/summary/update").startWith(null);

  summary$ = this.initialSummary$.switchMap(initial => {
    var gb = new GlobalActivitySummary();
    gb.Refresh(initial);
    return this.activitySummaryUpdate$.map(v => {
      gb.UpdateActivity(v);
      return gb.ToArray();
    });
  }).share();

  Branches$ = new ReplaySubject<string[]>(1);
}
