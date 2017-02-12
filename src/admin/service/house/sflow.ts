import { Injectable } from '@angular/core';
import { Model } from '../../shared/';
import { BranchCrudApiService, AdminFilter } from '../shared';

@Injectable()
export class SFlowService extends BranchCrudApiService<Model.House.ISFlow> {
    Name = "LABEL_SERVICE_SFLOW";
    ListFields = [
        { title: 'LABEL_SUB_BRANCH', name: 'branch' },
        { title: 'LABEL_ID_SERVICE', name: 'service_id' },
    ]
}
