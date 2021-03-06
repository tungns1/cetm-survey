import { Injectable } from '@angular/core';
import { CrudApiService } from '../shared';
import { ILayout } from '../shared';

@Injectable()
export class LayoutService extends CrudApiService<ILayout> {
    GetByType(type: string) {
        return this.Search({ type: type });
    }

    protected filter() {
        return this.GetByType('kiosk,screen,feedback');
    }
}
