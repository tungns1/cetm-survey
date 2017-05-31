import { Injectable } from '@angular/core';
import { CrudApiService, IVoiceList } from '../shared';

@Injectable()
export class VoiceListService extends CrudApiService<IVoiceList> {
    GetAll() {
        return this.Search({});
    }
    protected filter() {
        return this.GetAll();
    }
}
