import { ITicket, IMapTicket } from './ticket';
import { TicketStates } from './ticket_state';
import { Ticket } from './ticket';
import { sortTicket } from './ticket_priority';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class TicketGroup {
    constructor(
        private _data: IMapTicket
    ) {
        this.refresh(_data);
    }

    Waiting$ = new BehaviorSubject<Ticket[]>([]);
    Serving$ = new BehaviorSubject<Ticket[]>([]);
    Missed$ = new BehaviorSubject<Ticket[]>([]);
    Finished$ = new BehaviorSubject<Ticket[]>([]);
    Cancelled$ = new BehaviorSubject<Ticket[]>([]);

    Replace(t: ITicket, emit = true) {
        if (!t) return;
        const _t = new Ticket(t);
        this.cache.set(t.id, _t);
        if (emit) {
            this.aggregate();
        }
    }

    private refresh(data: IMapTicket) {
        if (!data) return;
        Object.keys(data).forEach(id => {
            this.Replace(data[id], false);
        });
        this.aggregate();
    }

    private aggregate() {
        this.Waiting$.next(this.getByState(TicketStates.Waiting));
        this.Serving$.next(this.getByState(TicketStates.Serving));
        this.Missed$.next(this.getByState(TicketStates.Missed));
        this.Finished$.next(this.getByState(TicketStates.Finished));
        this.Cancelled$.next(this.getByState(TicketStates.Cancelled));
    }

    private getByState(state: string) {
        return Array.from(this.cache.values())
            .filter(t => t.state === state)
            .sort(sortTicket);
    }

    private cache = new Map<string, Ticket>();
}

