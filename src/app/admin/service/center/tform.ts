import { Injectable } from '@angular/core';
import { Model, Branch, SharedService } from '../../shared/';
import { CrudApiService, AdminFilter } from '../shared';

@Injectable()
export class TFormService extends CrudApiService<Model.Org.IUser> {
    protected filter(d: AdminFilter) {
        return this.api.Search({});
    }

    ListFields = [
        { title: 'LANGAUGE_CODE', name: 'code' }
    ]

    Name = "LANGAUGE_NUM_TICKET";
}
