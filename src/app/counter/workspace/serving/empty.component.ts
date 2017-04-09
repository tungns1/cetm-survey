import { Component, OnChanges } from '@angular/core';
import { QueueService } from '../service';

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
        // if (this.waiting) {
        //     setTimeout(function () { alert("Hello"); }, 60000 * 1);
        // }
    }
}