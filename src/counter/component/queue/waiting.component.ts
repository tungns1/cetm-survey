import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../service';

@Component({
    selector: 'waiting',
    templateUrl: 'waiting.component.html',
    styleUrls: ['waiting.component.css']
})
export class WaitingComponent {
    constructor(
        private queueService: QueueService
    ) { }

    waiting$ = this.queueService.waiting$;
    count$ = this.waiting$.map(data => data.length);
}