import { Injectable } from '@angular/core';
import { CrudApiService, AddServiceName, IService } from '../shared';

@Injectable()
export class ServiceService extends CrudApiService<IService> {
    protected filter() {
        return this.api.Search({})
            .do(services => services.forEach(AddServiceName));
    }
}
