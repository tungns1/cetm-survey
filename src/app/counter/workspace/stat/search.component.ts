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

    message: number = 1;
    cnum$ = new Subject<string>();
    tickets$ = this.cnum$.switchMap(cnum => {
        return this.ticketService.Search(cnum);
    }).do(tickets => {
        if (!tickets || tickets.length < 1) {
            this.message = 2;
        } else {
            this.message = 1;
        }
    }, e => {
        this.message = 2;
    })

    searchTicket(cnum: string) {
        this.message = 3;
        this.cnum$.next(cnum);
    }

    stateKey(state: string) {
        return `State ${state}`;
    }
    
    checkState(t:ITicket){
        if(t.state==="waiting"){
            return true;
        }
        return false;
    }

    
}