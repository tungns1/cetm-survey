import { Injectable } from '@angular/core';
import {
  IDevice, ICountState, DeviceCount, ISumaryDevice
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
      return this.socket.Send<ISumaryDevice[]>("/count", {
        branches
      }).map(data => (data || []).map(d => new DeviceCount(d)));
    });
  }).share();

  private kioskUpdate$ = this.socket.RxEvent<ICountState>("/kiosk_track/count").startWith(null);
  private counterUpdate$ = this.socket.RxEvent<ICountState>("/counter_track/count").startWith(null);

  summary$ = this.initialSummary$.switchMap(initial => {
    const add = (s: ICountState) => {
      if (!s) {
        return initial;
      }
      return AddToSet(initial, s);
    }
    return this.kioskUpdate$.map(add), this.counterUpdate$.map(add);
  }).share();

  Branches$ = new ReplaySubject<string[]>(1);

}

function AddToSet(arr: DeviceCount[] = [], a: ICountState) {
  var v = arr;
  var add = true;
  if (arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].branch_id === a.branch_id) {
        if (a.device_type === 'Kiosk') {
          arr[i] = {
            branch_id: a.branch_id,
            device_type: a.device_type,
            total_counter: 0,
            total_kiosk: a.on + a.off,
            counter_on: 0,
            counter_off: 0,
            kiosk_on: a.on,
            kiosk_off: a.off
          }

        } else if (a.device_type === 'Counter') {
          arr[i] = {
            branch_id: a.branch_id,
            device_type: a.device_type,
            total_counter: a.on + a.off,
            total_kiosk: 0,
            counter_on: a.on,
            counter_off: a.off,
            kiosk_on: 0,
            kiosk_off: 0
          }
        }


        add = false;
        break;
      } else {
        continue;
      }
    }
  } else {
    if (add) {
      arr.push()
      var device: DeviceCount = null;
      if (a.device_type === 'Kiosk') {
        device = {
          branch_id: a.branch_id,
          device_type: a.device_type,
          total_counter: 0,
          total_kiosk: a.on + a.off,
          counter_on: 0,
          counter_off: 0,
          kiosk_on: a.on,
          kiosk_off: a.off
        }

      } else if (a.device_type === 'Counter') {
        device = {
          branch_id: a.branch_id,
          device_type: a.device_type,
          total_counter: a.on + a.off,
          total_kiosk: 0,
          counter_on: a.on,
          counter_off: a.off,
          kiosk_on: 0,
          kiosk_off: 0
        }
      }
      arr.push(device);
    }

  }
  return v;
}

