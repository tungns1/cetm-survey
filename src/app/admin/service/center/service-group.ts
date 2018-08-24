import { Injectable } from '@angular/core';
import { AuthService, HttpApi } from '../../shared';
import { IService, CacheServiceGroup, IServiceGroup } from '../shared';
import { CrudApiService, AdminNavService } from '../shared';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ServiceGroupService extends CrudApiService<IServiceGroup> {
    constructor(
        nav: AdminNavService,
        api: HttpApi<IService>,
        private authService: AuthService
    ) {
        super(nav, api);
    }
    protected filter() {
        return this.authService.ValidateSession().pipe(switchMap(_ => {
            return CacheServiceGroup.RxListView;
        }));
    }
}
