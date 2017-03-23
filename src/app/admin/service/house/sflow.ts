import { Injectable } from '@angular/core';
import { ISFlow } from '../shared';
import { BranchCrudApiService } from '../shared';
import { HttpServiceGenerator, BranchFilterService } from '../../shared';

@Injectable()
export class SFlowService extends BranchCrudApiService<ISFlow> {
    constructor(
        hsg: HttpServiceGenerator,
        filterService: BranchFilterService,
    ) {
        super("/api/admin/house/sflow", hsg, filterService);
    }
}
