import { Model, SharedService } from '../../shared/';
import { RefreshObservable } from '../rx';
import { Injectable } from '@angular/core';

@Injectable()
export class LayoutApi extends SharedService.Backend.HttpApi<Model.Center.ILayout> {
    constructor() {
        super("/api/admin/center/layout");
    }

    GetByType(type: string) {
        return this.Search({ type: type });
    }

    AutoRefresh(type: string) {
        return new RefreshObservable(() => this.GetByType(type));
    }
}