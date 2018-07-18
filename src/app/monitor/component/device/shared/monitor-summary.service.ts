import { Injectable } from '@angular/core';
import {
  IDevice, ICountState, DeviceCount,
  IBoxActivitySummary, GlobalActivitySummary,
  IActivitySummary, ActivitySummary
} from '../../shared';

import { MonitorDeviceSocket } from './monitor-device.socket';
import { ReplaySubject ,  merge ,  of } from 'rxjs';
import { IBoxActivity } from './index';
import { share, map, switchMap } from 'rxjs/operators';

@Injectable()
export class MonitorSummaryService {

  constructor(
    private socket: MonitorDeviceSocket
  ) { }

  private initialSummary$ = this.socket.Connected$.pipe(switchMap(_ => {
    return this.Branches$.pipe(switchMap(branches => {
      return this.socket.Send<IBoxActivitySummary[]>("/summary", {
        branches
      });
    }));
  }),share());

  private activitySummaryUpdate$ = this.socket.RxEvent<IBoxActivitySummary>("/activity/summary/update");

  Box$ = this.initialSummary$.pipe(switchMap(initial => {
    var gb = new GlobalActivitySummary();
    gb.Refresh(initial);
    const summaryUpdate = this.activitySummaryUpdate$.pipe(map(v => {
      gb.Replace(v);
    }));
    return merge(of(null), summaryUpdate).pipe(map(_ => gb));
  }),share());

  Branches$ = new ReplaySubject<string[]>(1);
}
