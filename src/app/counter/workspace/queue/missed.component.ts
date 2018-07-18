import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueueService, ITicket } from '../shared';

import { BehaviorSubject ,  combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'missed-queue',
    templateUrl: 'missed.component.html',
    styleUrls: ['queue.component.scss']
})
export class MissedComponent {
    constructor(
        private queueService: QueueService
    ) { }

    missed$ = this.queueService.missed$;
    search = new BehaviorSubject<string>('');

    count$ = this.missed$.pipe(map(data => data.length));
    tickets = combineLatest<ITicket[], string>(this.missed$, this.search).pipe(map(([tickets, text]) => {
        return tickets.filter(v => v.cnum.indexOf(text) !== -1);
    }));

    onSearch(ticket: string) {
        this.search.next(ticket);
    }

    trackFn(index, item) {
        return item.id;
    }
}