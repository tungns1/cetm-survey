import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SuperCounterService } from './super-counter.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CounterListService {
  constructor(
    private superCounterService: SuperCounterService
  ) {

  }

  counterList$ = this.superCounterService.Workspace$.pipe(map(w => {
    return w.counterList.ToArray();
  }))
    
}