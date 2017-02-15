import { Component, OnChanges } from '@angular/core';
import { QueueService } from '../shared';

@Component({
    selector: 'empty',
    templateUrl: 'empty.component.html',
    styleUrls: ['ticket.component.css']
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