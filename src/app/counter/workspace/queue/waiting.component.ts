import { Component, OnInit } from '@angular/core';
import { QueueService } from '../shared';
import { TimerComopnent } from '../shared';
import { ProjectConfig } from '../shared';

@Component({
    selector: 'waiting',
    templateUrl: 'waiting.component.html',
    styleUrls: ['queue.component.scss']
})
export class WaitingComponent {
    constructor(
        private queueService: QueueService
    ) { }

    waiting$ = this.queueService.waiting$;
    count$ = this.waiting$.map(data => data.length);
    maxWaitingMinute = ProjectConfig.service.max_waiting_minute;
}