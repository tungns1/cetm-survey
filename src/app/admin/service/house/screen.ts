import { Injectable } from '@angular/core';
import { BranchCrudApiService, IScreen } from '../shared';
import { HttpServiceGenerator, BranchFilterService } from '../../shared';

@Injectable()
export class ScreenService extends BranchCrudApiService<IScreen> {
    constructor(
        hsg: HttpServiceGenerator,
        filterService: BranchFilterService,
    ) {
        super("/api/admin/house/screen", hsg, filterService);
    }
}
