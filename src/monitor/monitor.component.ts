import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SetAsideFilterAndRefresh, SetRefreshInterval } from './backend/';

@Component({
    selector: 'app-monitor',
    templateUrl: 'monitor.component.html',
    styleUrls: ['monitor.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MonitorComponent {

    hidden = true;
    setAsideFilter = SetAsideFilterAndRefresh;
    intervals = [{
        interval: 30000,
        name: "30 giây"
    }, {
        interval: 15000,
        name: "15 giây"
    }]

    setRefreshInterval = SetRefreshInterval;
}
