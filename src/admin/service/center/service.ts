import { Model, SharedService } from '../../shared/';
import { RefreshObservable } from '../rx';
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceApi extends SharedService.Backend.HttpApi<Model.Center.IService> {
    constructor() {
        super("/api/admin/center/service");
    }

    GetAll() {
        return this.Search({})
            .do(services => services.forEach(Model.Center.AddServiceName));
    }
    AutoRefresh() {
        return new RefreshObservable(() => this.GetAll());
    }
}