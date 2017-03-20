import { Injectable } from '@angular/core';
import { BranchCrudApiService, AdminFilter, ICounter } from '../shared';

@Injectable()
export class CounterService extends BranchCrudApiService<ICounter> {
    
}
