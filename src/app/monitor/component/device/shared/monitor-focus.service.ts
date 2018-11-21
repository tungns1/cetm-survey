import { Injectable } from '@angular/core';
import { MonitorDeviceSocket } from './monitor-device.socket';

import { MonitorFilterService, MonitorNavService } from '../../shared';

import {
  IActivity, IBoxActivity, BoxActivity
} from '../../../model';

import { ReplaySubject ,  merge ,  of } from 'rxjs';
import { share, auditTime, map, startWith, switchMap } from 'rxjs/operators';


@Injectable()
export class MonitorFocusService {

  constructor(
    private socket: MonitorDeviceSocket,
    private navService: MonitorNavService
  ) { }

  private initialFocus$ = this.socket.Connected$.pipe(switchMap(_ => {
    return this.Branch$.pipe(switchMap(branch_id => {
      return this.socket.Send<IBoxActivity>("/focus", {
        branch_id
      })
    }));
  }),share());

  private activityUpdate$ = this.socket.RxEvent<IActivity>("/activity/update");

  Box$ = this.initialFocus$.pipe(switchMap(initial => {
    const box = new BoxActivity(initial);
    const activityUpdate = this.activityUpdate$.pipe(startWith(null),map(a => {
      box.UpdateActivity(a);
    }));
    return merge(of(null), activityUpdate).pipe(map(_ => box));
  }),auditTime(1000),share());

  Unfocus() {
    this.socket.Send("/focus", {}).subscribe();
  }

  Branch$ = new ReplaySubject<string>(1);
}
