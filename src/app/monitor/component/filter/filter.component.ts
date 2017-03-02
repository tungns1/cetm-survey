import { Component, Output, EventEmitter } from '@angular/core';
import { Branch } from '../../shared/';
import { Router } from '@angular/router';

import { MonitorNavService } from '../../service';

@Component({
    selector: 'monitor-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})
export class MonitorFilterComponent {
    constructor(private navService: MonitorNavService) { }

    refresh() {
        this.navService.SyncFilter();
    }
}