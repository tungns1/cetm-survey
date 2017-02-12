import { Injectable } from '@angular/core';
import { Model } from '../../shared/';
import { BranchCrudApiService, AdminFilter } from '../shared';

@Injectable()
export class KioskService extends BranchCrudApiService<Model.House.IKiosk> {
    Name = "LABEL_COUNTERS";
}
