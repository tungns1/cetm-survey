import { Injectable } from '@angular/core';
import { CrudApiService, AdminFilter } from '../shared';
import { ILayout } from '../shared';

@Injectable()
export class LayoutService extends CrudApiService<ILayout> {
    GetByType(type: string) {
        return this.api.Search({ type: type });
    }

    protected filter(d: AdminFilter) {
        return this.GetByType('kiosk,screen');
    }

    ListFields = [
        { title: 'LANGAUGE_NAME', name: 'name' },
        { title: 'LANGAUGE_TYPE', name: 'type' }
    ]
    Name = "LANGAUGE_LAYOUT";
}
