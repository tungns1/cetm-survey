import { Component } from '@angular/core';
import { ITicket, TicketService } from '../shared';
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

    message: string = "";
    cnum$ = new Subject<string>();
    tickets$ = this.cnum$.switchMap(cnum => {
        return this.ticketService.Search(cnum);
    }).do(tickets => {
        if (!tickets || tickets.length < 1) {
            this.message = 'Not Found Ticket';
        } else {
            this.message = '';
        }
    }, e => {
        this.message = 'Not Found Ticket';
    })

    searchTicket(cnum: string) {
        this.message = 'Search Ticket';
        this.cnum$.next(cnum);
    }

    stateKey(state: string) {
        return `State ${state}`;
    }

    getMessage() {
        if(this.message.length > 5) return this.message;
        else return "Ticket number";
    }
    checkState(t:ITicket){
        if(t.state==="waiting"){
            return true;
        }
        return false;
    }

    
}