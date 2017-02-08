import { Component } from '@angular/core';
import { Search, ITicket } from '../../service/ticket';
import { Model } from '../../shared';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html'
})
export class SearchComponent {
    message: string;
    ticket: Model.House.ITicket;
    number = '';
    serving: boolean;

    searchTicket(cnum: string) {
        this.number = cnum;
        this.ticket = void 0;
        this.message = 'SEARCH_TICKET';
        Search(cnum).subscribe(t => {
            if (!t || t.length < 1) {
                this.message = 'NOT_FOUND_TICKET';
            } else {
                this.ticket = t[0];
                this.serving = this.ticket.state == Model.House.TicketStates.Serving;
                this.message = '';
            }
        }, e => {
            this.message = 'NOT_FOUND_TICKET';
        })
    }

    stateKey(state: string) {
        return `STATE_${state.toUpperCase()}`;
    }
}