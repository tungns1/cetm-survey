import { Injectable } from '@angular/core';
import { CrudApiService, ITForm } from '../shared';
import { HttpServiceGenerator, BranchFilterService } from '../../shared';

@Injectable()
export class TFormService extends CrudApiService<ITForm> {
    constructor(
        hsg: HttpServiceGenerator,
        filterService: BranchFilterService,
    ) {
        super("/api/admin/center/tform", hsg, filterService);
    }

    protected filter() {
        return this.api.Search({});
    }
}
