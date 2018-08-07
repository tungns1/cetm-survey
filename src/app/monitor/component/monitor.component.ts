import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-monitor',
    templateUrl: 'monitor.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MonitorComponent {
    hidden = true;
}
