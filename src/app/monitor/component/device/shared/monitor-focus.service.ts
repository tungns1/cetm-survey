import { Injectable } from '@angular/core';
import { MonitorDeviceSocket } from './monitor-device.socket';

import { MonitorFilterService, MonitorNavService } from '../../shared';

import {
 IDevice
} from '../../../model';

import { ReplaySubject } from 'rxjs/ReplaySubject';

interface IFocusReply {
  counter_state: IDevice[];
  kiosk_state: IDevice[];
}

@Injectable()
export class MonitorFocusService {

  constructor(
    private socket: MonitorDeviceSocket,
    private navService: MonitorNavService
  ) { }

  private initialFocus$ = this.socket.Connected$.switchMap(_ => {
    return this.Branch$.switchMap(branch_id => {
      return this.socket.Send<IFocusReply>("/focus", {
        branch_id
      })
    });
  }).share();

  private kioskUpdate$ = this.socket.RxEvent<IDevice>("kiosk_track/update").startWith(null);
  private counterUpdate$ = this.socket.RxEvent<IDevice>("counter_track/update").startWith(null);


  counter$ = this.initialFocus$
    .map(data => data ? data.counter_state : [])
    .switchMap(counters => {
      return this.counterUpdate$.map(d => {
        if (d && counters.length > 0) {
          for (var i = 0; i < counters.length; i++) {
            if (counters[i].device_id === d.device_id) {
              counters[i] = d;
              break;
            }
          }
        }
        return counters;
      });
    }).share();


  kisok$ = this.initialFocus$
    .map(data => data ? data.kiosk_state : [])
    .switchMap(kiosks => {
      return this.kioskUpdate$.map(d => {
        if (d && kiosks.length > 0) {
          for (var i = 0; i < kiosks.length; i++) {
            if (kiosks[i].device_id === d.device_id) {
              kiosks[i] = d;
              break;
            }
          }
        }
        return kiosks;
      });
    }).share();




  Unfocus() {
    this.socket.Send("/focus", {}).subscribe();
  }

  Branch$ = new ReplaySubject<string>(1);
}
