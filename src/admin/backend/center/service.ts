import { FormBuilder, Validators } from '@angular/forms';
import { Model, Branch, Backend } from '../../shared/';

export const Api = new Backend.HttpApi<Model.Center.IService>("/api/admin/center/service");

export function GetAll() {
    return Api.Search({})
        .do(services => services.forEach(Model.Center.AddServiceName));
}


import { RefreshObservable } from '../rx';
import { Observable } from 'rxjs/Observable';

export function AutoRefresh() {
    return new RefreshObservable(GetAll);
}
