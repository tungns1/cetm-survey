import { Injectable } from '@angular/core';
import { BranchCrudApiService, AdminFilter, IBranchConfig } from '../shared';

@Injectable()
export class BranchConfigService extends BranchCrudApiService<IBranchConfig> {
    Name = "LANGAUGE_CONFIG";
}
