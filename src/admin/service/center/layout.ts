import { FormBuilder, Validators } from '@angular/forms';
import { Model, Branch, SharedService } from '../../shared/';

export const Api = new SharedService.Backend.HttpApi<Model.Center.ILayout>("/api/admin/center/layout");

import { RefreshObservable } from '../rx';

export function GetByType(type: string) {
    return Api.Search({ type: type });
}

export function AutoRefresh(type: string) {
    return new RefreshObservable(() => GetByType(type));
}
