import { Injectable } from '@angular/core';
import { MonitorDeviceSocket } from './monitor-device.socket';

import { MonitorFilterService, MonitorNavService } from '../../shared';

import {
  IActivity, IBoxActivity, BoxActivity
} from '../../../model';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/auditTime';

@Injectable()
export class MonitorFocusService {

  constructor(
    private socket: MonitorDeviceSocket,
    private navService: MonitorNavService
  ) { }

  private initialFocus$ = this.socket.Connected$.switchMap(_ => {
    return this.Branch$.switchMap(branch_id => {
      return this.socket.Send<IBoxActivity>("/focus", {
        branch_id
      })
    });
  }).share();

  private activityUpdate$ = this.socket.RxEvent<IActivity>("/activity/update");

  Box$ = this.initialFocus$.switchMap(initial => {
    const box = new BoxActivity(initial);
    const activityUpdate = this.activityUpdate$.startWith(null).map(a => {
      box.UpdateActivity(a);
    });
    return merge(of(null), activityUpdate).map(_ => box);
  }).auditTime(1000).share();

  Unfocus() {
    this.socket.Send("/focus", {}).subscribe();
  }

  Branch$ = new ReplaySubject<string>(1);
}
