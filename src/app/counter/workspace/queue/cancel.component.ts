import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueueService, ITicket } from '../shared';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const search = new BehaviorSubject<string>('');

@Component({
    selector: 'cancel-queue',
    templateUrl: 'cancel.component.html',
    styleUrls: ['queue.component.scss']
})
export class CancelComponent {
    constructor(
        private queueService: QueueService
    ) { }

    cancel$ = this.queueService.cancel$;

    count$ = this.cancel$.map(data => data.length);
    tickets = combineLatest<ITicket[], string>(this.cancel$, search).map(([tickets, text]) => {
        return tickets.filter(v => v.cnum.indexOf(text) !== -1);
    });

    onSearch(ticket: string) {
        search.next(ticket);
    }
}