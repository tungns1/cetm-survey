import { Component } from '@angular/core';
import { Search, ITicket } from '../backend/ticket';
import { Model } from '../shared/';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html'
})
export class SearchComponent {
    message: string;
    ticket: Model.House.ITicket;

    serving: boolean;

    searchTicket(cnum: string) {
        this.ticket = void 0;
        this.message = 'Đang tìm vé ' + cnum + ' ...';
        Search(cnum).subscribe(t => {
            if (!t || t.length < 1) {
                this.message = `Không tìm thấy vé ${cnum}`;
            } else {
                this.ticket = t[0];
                this.serving = this.ticket.state == Model.House.TicketStateServing;
                this.message = '';
            }
        }, e => {
            this.message = `Không tìm thấy vé ${cnum}`;
        })
    }
}