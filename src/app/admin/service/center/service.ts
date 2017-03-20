import { Injectable } from '@angular/core';
import { CrudApiService, AdminFilter, AddServiceName, IService } from '../shared';

@Injectable()
export class ServiceService extends CrudApiService<IService> {
    protected filter(d: AdminFilter) {
        return this.api.Search({})
            .do(services => services.forEach(AddServiceName));
    }
}
