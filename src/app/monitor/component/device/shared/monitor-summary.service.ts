import { Injectable } from '@angular/core';
import {
  IDevice, ICountState, DeviceCount,
  IBoxActivitySummary, GlobalActivitySummary,
  IActivitySummary, ActivitySummary
} from '../../shared';

import { MonitorDeviceSocket } from './monitor-device.socket';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { IBoxActivity } from './index';

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

  private activitySummaryUpdate$ = this.socket.RxEvent<IBoxActivitySummary>("/activity/summary/update");

  Box$ = this.initialSummary$.switchMap(initial => {
    var gb = new GlobalActivitySummary();
    gb.Refresh(initial);
    const summaryUpdate = this.activitySummaryUpdate$.map(v => {
      gb.Replace(v);
    });
    return merge(of(null), summaryUpdate).map(_ => gb);
  }).share();

  Branches$ = new ReplaySubject<string[]>(1);
}
