import { Injectable } from '@angular/core';
import { ISFlow } from '../shared';
import { BranchCrudApiService, AdminFilter } from '../shared';

@Injectable()
export class SFlowService extends BranchCrudApiService<ISFlow> {
    Name = "LANGAUGE_SERVICE_SFLOW";
    ListFields = [
        { title: 'LANGAUGE_SUB_BRANCH', name: 'branch' },
        { title: 'LANGAUGE_ID_SERVICE', name: 'service_id' },
    ]
}
