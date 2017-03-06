import { Injectable } from '@angular/core';
import { Model } from '../../shared/';
import { BranchCrudApiService, AdminFilter } from '../shared';

@Injectable()
export class SFlowService extends BranchCrudApiService<Model.House.ISFlow> {
    Name = "LANGAUGE_SERVICE_SFLOW";
    ListFields = [
        { title: 'LANGAUGE_SUB_BRANCH', name: 'branch' },
        { title: 'LANGAUGE_ID_SERVICE', name: 'service_id' },
    ]
}
