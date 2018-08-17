import { Component, ChangeDetectionStrategy } from '@angular/core';
import { QueueService, ITicket } from '../shared';
import { combineLatest ,  BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'cancel-queue',
    templateUrl: 'cancel.component.html',
    styleUrls: ['queue.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CancelComponent {
    constructor(
        private queueService: QueueService
    ) { }

    cancel$ = this.queueService.cancel$;
    search = new BehaviorSubject<string>('');
    show: boolean = false;

    count$ = this.cancel$.pipe(map(data => data.length));
    tickets = combineLatest<ITicket[], string>(this.cancel$, this.search).pipe(map(([tickets, text]) => {
        return tickets.filter(v => v.cnum.indexOf(text) !== -1);
    }));

    onSearch(ticket: string) {
        this.search.next(ticket);
    }

    trackFn(index, item) {
        return item.id;
    }
}