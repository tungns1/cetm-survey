import { Injectable } from '@angular/core';
import { Model } from '../../shared/';
import { BranchCrudApiService, AdminFilter } from '../shared';

@Injectable()
export class CounterService extends BranchCrudApiService<Model.House.ICounter> {
    Name = "LABEL_COUNTERS";
}
