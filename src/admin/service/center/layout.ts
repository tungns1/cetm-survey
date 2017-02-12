import { Injectable } from '@angular/core';
import { Model, Branch, SharedService } from '../../shared/';
import { CrudApiService, AdminFilter } from '../shared';

@Injectable()
export class LayoutService extends CrudApiService<Model.Center.IService> {
    GetByType(type: string) {
        return this.api.Search({ type: type });
    }

    protected filter(d: AdminFilter) {
        return this.GetByType('kiosk,screen');
    }

    ListFields = [
        { title: 'LABEL_NAME', name: 'name' },
        { title: 'LABEL_TYPE', name: 'type' }
    ]

    Name = "LABEL_LAYOUT";
}
