import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonitorFilterService } from '../shared';
import { MonitorDeviceService } from './device.service';
import { SummaryComponent } from './summary/summary.component';
import { FocusComponent } from './focus/focus.component';
import { MonitorNavService } from '../../service/shared/nav';

@Component({
    selector: 'monitor-device',
    templateUrl: 'device.component.html'
})
export class MonitorDeviceComponent implements OnInit {
    constructor(        
        private navService: MonitorNavService,
        private filterService: MonitorFilterService,
        private deviceService: MonitorDeviceService
    ) { }

    ngOnInit() {
        this.deviceService.onInit();
    }

    ngOnDestroy() {
        this.deviceService.onDestroy();
    }

    isFocus$ = this.filterService.Data$.map(filter => {
        return filter.focus.length > 0;
    });

}