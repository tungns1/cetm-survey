import { Injectable } from '@angular/core';
import { ISFlow } from '../shared';
import { BranchCrudApiService } from '../shared';

@Injectable()
export class SFlowService extends BranchCrudApiService<ISFlow> {
    
}
