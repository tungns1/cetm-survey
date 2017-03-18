import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-monitor',
    templateUrl: 'monitor.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MonitorComponent {
    hidden = true;
}
