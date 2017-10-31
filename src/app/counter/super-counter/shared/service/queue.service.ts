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
    cancel$ = this.ticketList$.map(ticketList => ticketList.filter(ticket => ticket.state === 'cancelled'))
}