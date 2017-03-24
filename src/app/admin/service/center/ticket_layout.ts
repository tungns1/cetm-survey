import { Injectable } from '@angular/core';
import { CrudApiService, AdminFilter, ITicketLayout } from '../shared';

@Injectable()
export class TicketLayoutService extends CrudApiService<ITicketLayout> {
     GetAll() {
        return this.api.Search({ });
    }
    protected filter(d: AdminFilter) {
        return this.GetAll();
    }
}
