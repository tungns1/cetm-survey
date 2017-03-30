import { Injectable } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IDevice,SummaryDevice,IDevices } from '../../model';


import {
    MonitorFilterService,
    HttpServiceGenerator, AppSocketGenerator
} from '../shared';


import {
    CacheCounter, CacheUsers,
    ICounter, IUser, ICustomer
} from '../../../shared/model';


const MonitorSocketLink = "/room/monitor/join";

@Injectable()
export class MonitorDeviceService {
    constructor(
        private filterService: MonitorFilterService,
        private httpServiceGenerator: HttpServiceGenerator,
        private appSocketGenerator: AppSocketGenerator
    ) { }

    private socket = this.appSocketGenerator.make(MonitorSocketLink);

    onInit() {
        this.socket.Connect({});
        this.socket.disableCheckAlive();
        this.initialSummary$.subscribe(data => console.log(data));
    }

    onDestroy() {
        this.socket.Terminate();
    }
    private initialSummary$ = this.socket.Connected$.switchMap(_ => {
        return this.filterService.Data$.switchMap(filter => {
            const branches = this.filterService.GetStores();
            return this.socket.Send<IDevices>("/summary_device", {
                branches
            }).map(SummaryDevice.Make)
        });
    }).share();

    private kioskUpdate$ = this.socket.RxEvent<IDevice>("/kiosk_track/update").startWith(null);
    private counterUpdate$ = this.socket.RxEvent<IDevice>("/kiosk_track/update").startWith(null);

    summary$ = this.initialSummary$.switchMap(initial => {
        const add = (s: IDevice) => {
            if (!s) {
                return initial;
            }
            // return AddToSet(initial, new SummaryDevice(s));
        }
        return this.kioskUpdate$.map(add), this.counterUpdate$.map(add);
    }).share();
}

function AddToSet(arr: SummaryDevice[] = [], a: SummaryDevice) {
    var v = arr;
    var add = true;
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].branch_id === a.branch_id) {
                v[i] = a;
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