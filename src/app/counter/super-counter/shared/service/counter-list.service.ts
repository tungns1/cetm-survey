import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { SuperCounterService } from './super-counter.service';

@Injectable()
export class CounterListService {
  constructor(
    private superCounterService: SuperCounterService
  ) {

  }

  counterList$ = this.superCounterService.Workspace$.map(w => {
    return w.counterList.ToArray();
  })
    
}