import { Component, Input } from '@angular/core';
import { ITicket, ProjectConfig } from '../shared';
import { Subject ,  of } from 'rxjs';

@Component({
    selector: 'average-time',
    templateUrl: 'avgTime.component.html',
    styleUrls: ['sta.component.scss']
})
export class AvgTimeComponent {
    constructor() { }

    @Input() set stime(t: number) {
        this.duration = t;
        this.warning = t > (this.maxServingMinute * 60 + 1);
    }

    maxServingMinute = ProjectConfig.service.max_serving_minute;
    duration = 0;
    warning = false;
}