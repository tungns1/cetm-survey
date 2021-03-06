import { Injectable } from '@angular/core';
import { ISFlow, CacheService } from '../shared';
import { BranchCrudApiService, AdminNavService } from '../shared';
import { BranchFilterService } from '../../shared';
import { HttpApi, HttpServiceGenerator } from '../../shared';
import { map } from 'rxjs/operators';

@Injectable()
export class SFlowService extends BranchCrudApiService<ISFlow> {
    constructor(
        nav: AdminNavService,
        api: HttpApi<ISFlow>,
        filter: BranchFilterService
    ) {
        super(nav, api, filter);        
    }

    protected filter() {
        return super.filter().pipe(map(data => {
            data.forEach(d => {
                d.service = CacheService.ServiceName(d.service_id);
            });
            return data;
        }))
    }
}
