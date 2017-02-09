import { Model, SharedService } from '../../shared/';
import { RefreshObservable } from '../rx';
import { Injectable } from '@angular/core';

@Injectable()
export class TFormApi extends SharedService.Backend.HttpApi<Model.Center.ITForm> {
    constructor() {
        super("/api/admin/center/tform");
    }

    AutoRefresh() {
        return new RefreshObservable(() => this.Search({}));
    }
}