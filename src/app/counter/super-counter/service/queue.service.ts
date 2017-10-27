import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { SuperCounterService } from './super-counter.service';

@Injectable()
export class QueueService {
    constructor(
        private superCounterService: SuperCounterService
    ) {
        
    }

    ticketList$ = this.superCounterService.Workspace$.map(w => w.ticketsToArray)

    waiting$ = this.ticketList$.map(ticketList => ticketList.filter(ticket => ticket.state === 'waiting'))
    serving$ = this.ticketList$.map(ticketList => ticketList.filter(ticket => ticket.state === 'serving'))
    cancel$ = this.ticketList$.map(ticketList => ticketList.filter(ticket => ticket.state === 'cancelled'))
    // _serving$ = this.superCounterService.Workspace$.map(w => w.Serving);
    // _missed$ = this.superCounterService.Workspace$.map(w => w.Missed);
    // _cancel$ = this.superCounterService.Workspace$.map(w => w.Cancel);

    // waiting$ = this._waiting$.map(q => q.ti);
    // serving$ = this._serving$.map(q => q.ToArray());
    // missed$ = this._missed$.map(q => q.ToArray());
    // cancel$ = this._cancel$.map(q => q.ToArray());

    // busy$ = this._serving$.map(q => q.size > 0);
    // canNext$ = this._waiting$.map(q => q.size > 0)
    //     .combineLatest(this.busy$, (a, b) => a && !b);
}