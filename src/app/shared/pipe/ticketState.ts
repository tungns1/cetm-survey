import { Pipe } from '@angular/core';
import { House } from '../model/';

@Pipe({
    name: 'ticketState'
})
export class TicketStatePipe {
    transform(t: House.ITicket) {
        return `STATE_${t.state.toUpperCase()}`;
    }
}