import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { QueueService } from '../shared';
import { TimerComopnent } from '../shared';
import { ProjectConfig } from '../shared';

@Component({
    selector: 'waiting-queue',
    templateUrl: 'waiting.component.html',
    styleUrls: ['queue.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingComponent {
    constructor(
        private queueService: QueueService
    ) { }

    waiting$ = this.queueService.waiting$;
    count$ = this.waiting$.map(data => data.length);
    maxWaitingMinute = ProjectConfig.service.max_waiting_minute;

    ngOnInit() {
        this.waiting$.subscribe(w => {
            console.log(w)
        })
    }
}