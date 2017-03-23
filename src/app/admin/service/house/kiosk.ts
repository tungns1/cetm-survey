import { Injectable } from '@angular/core';
import { BranchCrudApiService, IKiosk } from '../shared';
import { HttpServiceGenerator, BranchFilterService } from '../../shared';

@Injectable()
export class KioskService extends BranchCrudApiService<IKiosk> {
    constructor(
        hsg: HttpServiceGenerator,
        filterService: BranchFilterService,
    ) {
        super("/api/admin/house/kiosk", hsg, filterService);
    }
}
