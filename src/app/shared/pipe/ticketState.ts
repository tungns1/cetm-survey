import { Pipe } from '@angular/core';
import { ITicket } from '../model/';

@Pipe({
    name: 'ticketState'
})
export class TicketStatePipe {
    transform(t: ITicket) {
        return `State ${t.state}`;
    }
}


@Pipe({
    name: 'ticketStateFinish'
})
export class TicketStateFinishPipe {
    transform(t: ITicket) {
        return `State ${t.state}`;
    }
}