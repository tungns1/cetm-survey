import { Component, Input } from '@angular/core';
import { ITicket, TicketService, ProjectConfig } from '../shared';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'average-time',
    templateUrl: 'avgTime.component.html',
    styleUrls: ['sta.component.scss']
})
export class AvgTimeComponent {
    constructor(
        private ticketService: TicketService
    ) { }

    @Input() set stime(t: number) {
        this.duration = t;
        this.warning = t > (this.maxServingMinute * 60 + 1);
    }

    maxServingMinute = ProjectConfig.service.max_serving_minute;
    protected duration = 0;
    protected warning = false;
}