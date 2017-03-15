import { Component } from '@angular/core';
import { Model, ITicket } from '../../shared';
import { TicketService } from '../service';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['sta.component.scss']
})
export class SearchComponent {
    constructor(
        private ticketService: TicketService
    ) { }

    message: string;
    cnum$ = new Subject<string>();
    tickets$ = this.cnum$.switchMap(cnum => {
        return this.ticketService.Search(cnum);
    }).do(tickets => {
        if (!tickets || tickets.length < 1) {
            this.message = 'NOT_FOUND_TICKET';
        } else {
            this.message = '';
        }
    }, e => {
        this.message = 'NOT_FOUND_TICKET';
    })

    searchTicket(cnum: string) {
        this.message = 'SEARCH_TICKET';
        this.cnum$.next(cnum);
    }

    stateKey(state: string) {
        return `STATE_${state.toUpperCase()}`;
    }
}