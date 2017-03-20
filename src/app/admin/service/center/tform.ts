import { Injectable } from '@angular/core';
import { CrudApiService, AdminFilter, ITForm } from '../shared';

@Injectable()
export class TFormService extends CrudApiService<ITForm> {
    protected filter(d: AdminFilter) {
        return this.api.Search({});
    }

    ListFields = [
        { title: 'Code', name: 'code' }
    ]

    Name = "Number ticket";
}
