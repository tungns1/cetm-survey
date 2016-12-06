import { FormBuilder, Validators } from '@angular/forms';
import { Model, Branch, Backend } from '../../shared/';

export const Api = new Backend.HttpApi<Model.Center.ILayout>("/api/admin/center/layout");

import { RefreshObservable } from '../rx';

export function GetByType(type: string) {
    return Api.Search({ type: type });
}

export function AutoRefresh() {
    return new RefreshObservable(() => GetByType('kiosk,screen'));
}
