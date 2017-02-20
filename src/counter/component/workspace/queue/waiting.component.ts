import { Component, OnInit } from '@angular/core';
import { QueueService } from '../service';

@Component({
    selector: 'waiting',
    templateUrl: 'waiting.component.html'
})
export class WaitingComponent {
    constructor(
        private queueService: QueueService
    ) { }

    waiting$ = this.queueService.waiting$;
    count$ = this.waiting$.map(data => data.length);
}