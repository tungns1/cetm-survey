import { Component, ChangeDetectionStrategy } from '@angular/core';
import { QueueService } from '../shared';
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

    dataLength: number = 0;
    waiting$ = this.queueService.waiting$;
    maxWaitingMinute = ProjectConfig.service.max_waiting_minute;
    page: number = 0;

    ngOnInit() {
        this.queueService.waiting$.subscribe(data => { this.dataLength = data.length; console.log(data) });
        let test = document.getElementById('ticket');
        setTimeout(() => {
            console.log(test)
        }, 7000);
    }

    trackFn(index, item) {
        return item.id;
    }

    nextPage() {

    }

    prevPage() {
        if (this.page > 0) this.page--;
    }
}