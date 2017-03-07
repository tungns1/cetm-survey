import { Injectable } from '@angular/core';
import { Model, Branch, SharedService } from '../../shared/';
import { CrudApiService, AdminFilter } from '../shared';

@Injectable()
export class ServiceService extends CrudApiService<Model.Center.IService> {
    protected filter(d: AdminFilter) {
        return this.api.Search({})
            .do(services => services.forEach(Model.Center.AddServiceName));
    }

    ListFields = [
        { title: 'LANGAUGE_NAME_SERVICE', name: 'name' },
    ]

    Name = "LANGAUGE_SERVICE";
}
