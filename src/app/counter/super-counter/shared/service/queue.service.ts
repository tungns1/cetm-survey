import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SuperCounterService } from './super-counter.service';
import { map } from 'rxjs/operators';

@Injectable()
export class QueueService {
    constructor(
        private superCounterService: SuperCounterService
    ) {
        
    }

    waiting$ = this.superCounterService.Workspace$.pipe(map(w => w.waiting));
    cancel$ = this.superCounterService.Workspace$.pipe(map(w => w.cancelled));
    serving$ = this.superCounterService.Workspace$.pipe(map(w => w.serving));
}