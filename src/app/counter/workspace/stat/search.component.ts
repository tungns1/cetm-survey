import { Component } from '@angular/core';
import { ITicket, TicketService } from '../shared';
import { Subject ,  of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

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
    tickets$ = this.cnum$.pipe(switchMap(cnum => {
        return this.ticketService.Search(cnum);
    }),tap(tickets => {
        if (!tickets || tickets.length < 1) {
            this.message = 2;
        } else {
            this.message = 1;
        }
    }, e => {
        this.message = 2;
    }))

    searchTicket(cnum: string) {
        this.message = 3;
        this.cnum$.next(cnum);
    }

    stateKey(state: string) {
        return `State ${state}`;
    }

    getLastCallingTime(ticket: ITicket) {
        let lastCallingTime: number;
        for (let i = ticket.tracks.length - 1; i >= 0; i--) {
            if(ticket.tracks[i].state === 'serving'){
                lastCallingTime = ticket.tracks[i].mtime;
                break;
            }
        }
        return lastCallingTime;
    }
}