import { Injectable } from '@angular/core';
import { HttpServiceGenerator, BranchFilterService } from '../../shared';
import { CrudApiService } from '../shared';
import { ILayout } from '../shared';

@Injectable()
export class LayoutService extends CrudApiService<ILayout> {
    constructor(
        hsg: HttpServiceGenerator,
        filterService: BranchFilterService,
    ) {
        super("/api/admin/center/layout", hsg, filterService);
    }

    GetByType(type: string) {
        return this.api.Search({ type: type });
    }

    protected filter() {
        return this.GetByType('kiosk,screen');
    }
}
