import { Injectable } from '@angular/core';
import { BranchCrudApiService, ICounter } from '../shared';

@Injectable()
export class CounterService extends BranchCrudApiService<ICounter> {
    
}
