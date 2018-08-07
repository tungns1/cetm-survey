import { Injectable } from '@angular/core';
import { AuthService, HttpApi } from '../../shared/';
import { CacheService, AddServiceName, IService } from '../shared';
import {
    CrudApiService, IBranch, CacheBranch, AdminNavService
} from '../shared';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ServiceService extends CrudApiService<IService> {
    constructor(
        nav: AdminNavService,
        api: HttpApi<IService>,
        private authService: AuthService
    ) {
        super(nav, api);
    }
    protected filter() {
        return this.authService.ValidateSession().pipe(switchMap(_ => {
            return CacheService.RxListView;
        }));
    }
}
