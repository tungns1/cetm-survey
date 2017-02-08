import { FormBuilder, Validators } from '@angular/forms';
import { Model, Branch, SharedService } from '../../shared/';

export const Api = new SharedService.Backend.HttpApi<Model.Center.ITForm>("/api/admin/center/tform");

import { RefreshObservable } from '../rx';

export function AutoRefresh() {
    return new RefreshObservable(() => Api.Search({}));
}
