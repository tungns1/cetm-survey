import { Component, OnInit } from '@angular/core';
import { MonitorFilterService } from '../shared';
import { MonitorDeviceSocket } from './shared';
import { map } from 'rxjs/operators';

@Component({
    selector: 'monitor-device',
    templateUrl: 'device.component.html'
})
export class MonitorDeviceComponent implements OnInit {
       constructor(
        private filterService: MonitorFilterService,
        private socket: MonitorDeviceSocket
    ) { }

    ngOnInit() {
        this.socket.onInit();
    }

    ngOnDestroy() {
        this.socket.onDestroy();
    }

    isFocus$ = this.filterService.Data$.pipe(map(filter => {
        return filter.focus.length > 0;
    }));


}