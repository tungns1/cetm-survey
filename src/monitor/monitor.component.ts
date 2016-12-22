import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SetAsideFilterAndRefresh } from './backend/';

@Component({
    selector: 'app-monitor',
    templateUrl: 'monitor.component.html',
    styleUrls: ['monitor.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MonitorComponent {
    show = true;
    setAsideFilter = SetAsideFilterAndRefresh;
}
