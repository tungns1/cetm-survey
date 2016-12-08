import { Component } from '@angular/core';
import { Search, ITicket } from '../backend/ticket';
import { Model } from '../shared/';

interface ITicketTrack {
    state: Model.House.TicketState;
    mtime: number;
    services: string[];
    user_id: string;
    counter_id: string;
    service_id: string;
}

@Component({
    selector: 'search',
    templateUrl: 'search.component.html'
})
export class SearchComponent {
    message: string;
    ticket: Model.House.ITicket;

    searchTicket(cnum: string) {
        this.ticket = void 0;
        this.message = 'lookup ' + cnum + ' ...';
        Search(cnum).subscribe(t => {
            this.ticket = t;
            this.message = '';
        }, e => {
            this.message = `Không tìm thấy vé ${cnum}`;
        })
    }
}