import { Injectable } from '@angular/core';
import { CrudApiService, ITicketLayout } from '../shared';

@Injectable()
export class TicketLayoutService extends CrudApiService<ITicketLayout> {
     GetAll() {
        return this.Search({ });
    }
    protected filter() {
        return this.GetAll();
    }
}
