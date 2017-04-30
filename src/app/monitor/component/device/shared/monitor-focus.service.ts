import { Injectable } from '@angular/core';
import { MonitorDeviceSocket } from './monitor-device.socket';

import { MonitorFilterService, MonitorNavService } from '../../shared';

import {
  IActivity, IBoxEvent, BoxEvent
} from '../../../model';

import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class MonitorFocusService {

  constructor(
    private socket: MonitorDeviceSocket,
    private navService: MonitorNavService
  ) { }

  private initialFocus$ = this.socket.Connected$.switchMap(_ => {
    return this.Branch$.switchMap(branch_id => {
      return this.socket.Send<IBoxEvent>("/focus", {
        branch_id
      })
    });
  }).share();

  private activityUpdate$ = this.socket.RxEvent<IActivity>("/activity/update");

  Box$ = this.initialFocus$.switchMap(initial => {
    const box = new BoxEvent(initial.branch_id);
    box.Refresh(initial);
    console.log(initial);
    return this.activityUpdate$.startWith(null).map(a => {
      box.UpdateActivity(a);
      return box;
    });
  }).share();

  Unfocus() {
    this.socket.Send("/focus", {}).subscribe();
  }

  Branch$ = new ReplaySubject<string>(1);
}
