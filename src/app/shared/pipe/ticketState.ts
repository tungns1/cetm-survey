import { Pipe } from '@angular/core';
import { ITicket } from '../model/';

@Pipe({
    name: 'ticketState'
})
export class TicketStatePipe {
    transform(t: ITicket) {
        return `STATE_${t.state.toUpperCase()}`;
    }
}