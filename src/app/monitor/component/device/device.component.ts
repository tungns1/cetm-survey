import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonitorFilterService } from '../shared';
import { SummaryComponent } from './summary/summary.component';
import { FocusComponent } from './focus/focus.component';
import { MonitorNavService } from '../../service/shared/nav';
import { MonitorDeviceSocket, MonitorSummaryService } from './shared';
import { map } from 'rxjs/operators';

@Component({
    selector: 'monitor-device',
    templateUrl: 'device.component.html'
})
export class MonitorDeviceComponent implements OnInit {
       constructor(
        private navService: MonitorNavService,
        private filterService: MonitorFilterService,
        private summaryService: MonitorSummaryService,
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