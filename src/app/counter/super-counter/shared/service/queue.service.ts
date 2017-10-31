import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { SuperCounterService } from './super-counter.service';

@Injectable()
export class QueueService {
    constructor(
        private superCounterService: SuperCounterService
    ) {
        
    }

    ticketList$ = this.superCounterService.Workspace$.map(w => w.queue);

    waiting$ = this.superCounterService.Workspace$.map(w => w.waiting);
    cancel$ = this.superCounterService.Workspace$.map(w => w.cancelled);
    serving$ = this.superCounterService.Workspace$.map(w => w.serving);
}