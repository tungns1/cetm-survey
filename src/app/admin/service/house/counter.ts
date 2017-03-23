import { Injectable } from '@angular/core';
import { BranchCrudApiService, ICounter } from '../shared';
import { HttpServiceGenerator, BranchFilterService } from '../../shared';

@Injectable()
export class CounterService extends BranchCrudApiService<ICounter> {
    constructor(
        hsg: HttpServiceGenerator,
        filterService: BranchFilterService,
    ) {
        super("/api/admin/house/counter", hsg, filterService);
    }
}
