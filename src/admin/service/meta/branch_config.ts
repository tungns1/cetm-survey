import { Injectable } from '@angular/core';
import { Model, Branch, SharedService } from '../../shared/';
import { BranchCrudApiService, AdminFilter } from '../shared';

@Injectable()
export class BranchConfigService extends BranchCrudApiService<Model.Meta.IBranchConfig> {
    ListFields = [
        { title: 'LABEL_BRANCH', name: 'branch' }
    ]

    Name = "LABEL_CONFIG";
}
