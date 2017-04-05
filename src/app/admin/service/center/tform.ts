import { Injectable } from '@angular/core';
import { CrudApiService, ITForm } from '../shared';

@Injectable()
export class TFormService extends CrudApiService<ITForm> {
    protected filter() {
        return this.Search({});
    }
}
