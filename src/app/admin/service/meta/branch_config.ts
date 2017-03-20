import { Injectable } from '@angular/core';
import { BranchCrudApiService, AdminFilter, IBranchConfig } from '../shared';

@Injectable()
export class BranchConfigService extends BranchCrudApiService<IBranchConfig> {
    ListFields = [
        { title: 'LANGAUGE_BRANCH', name: 'branch' }
    ]

    Name = "LANGAUGE_CONFIG";
}
