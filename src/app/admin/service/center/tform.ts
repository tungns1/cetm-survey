import { Injectable } from '@angular/core';
import { Model, Branch, SharedService } from '../../shared/';
import { CrudApiService, AdminFilter } from '../shared';

@Injectable()
export class TFormService extends CrudApiService<Model.Org.IUser> {
    protected filter(d: AdminFilter) {
        return this.api.Search({});
    }

    ListFields = [
        { title: 'CODE', name: 'code' }
    ]

    Name = "LABEL_NUM_TICKET";
}
