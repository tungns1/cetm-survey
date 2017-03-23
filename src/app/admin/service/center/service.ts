import { Injectable } from '@angular/core';
import { CrudApiService, AddServiceName, IService } from '../shared';
import { HttpServiceGenerator, BranchFilterService } from '../../shared';

@Injectable()
export class ServiceService extends CrudApiService<IService> {
    constructor(
        hsg: HttpServiceGenerator,
        filterService: BranchFilterService,
    ) {
        super("/api/admin/center/service", hsg, filterService);
    }

    protected filter() {
        return this.api.Search({})
            .do(services => services.forEach(AddServiceName));
    }
}
