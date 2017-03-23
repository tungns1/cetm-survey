import { Injectable } from '@angular/core';
import { BranchCrudApiService, IBranchConfig } from '../shared';
import { HttpServiceGenerator, BranchFilterService } from '../../shared';

@Injectable()
export class BranchConfigService extends BranchCrudApiService<IBranchConfig> {
    constructor(
        hsg: HttpServiceGenerator,
        filterService: BranchFilterService,
    ) {
        super("/api/admin/meta/branch_config", hsg, filterService);
    }
}
