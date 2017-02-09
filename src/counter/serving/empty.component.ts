import { Component, OnChanges } from '@angular/core';
import { RxBusy, RxWaiting } from '../backend/queue';

@Component({
    selector: 'empty',
    templateUrl: 'empty.component.html',
    styleUrls: ['ticket.component.css']
})
export class EmptyComponent {
    display = RxBusy;
    waiting = RxWaiting;
    ngOnInit() {
        if (this.waiting) {
            setTimeout(function () { alert("Hello"); }, 60000 * 1);
        }
    }
}