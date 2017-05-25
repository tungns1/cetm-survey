import { Component, OnChanges } from '@angular/core';
import { QueueService } from '../shared';

@Component({
    selector: 'empty',
    templateUrl: 'empty.component.html',
    styleUrls: ['emptyAndTicket.component.scss']
})
export class EmptyComponent {
    constructor(
        private queueService: QueueService
    ) { }

    busy$ = this.queueService.busy$;

    ngOnInit() {
       
    }
}