import {
    Ticket, IMapTicket, ITicket,
    TicketState, TicketStates
} from './shared';

export class TicketQueue {
    constructor(protected state: TicketState) { }
    protected data = new Map<string, Ticket>();

    Refresh(tickets: IMapTicket) {
        if (!tickets) return;
        this.data = new Map<string, Ticket>();
        Object.keys(tickets).forEach(id => {
            this.Replace(new Ticket(tickets[id]));
        });
    }

    protected canAdd(t: Ticket) {
        return true;
    }

    Replace(t: Ticket) {
        if (!t) return;
        if (t.state == this.state && this.canAdd(t)) {
            this.data.set(t.id, t);
        } else {
            this.data.delete(t.id);
        }
    }

    get size() {
        return this.data.size;
    }

    get is_empty() {
        return this.size < 1;
    }

    ToArray() {
        return Array.from(this.data.values())
            .sort(Ticket.sort);
    }

    GetFirstTicket() {
        return this.ToArray()[0];
    }
}

class RestrcitedQueue extends TicketQueue {
    constructor(
        state: TicketState,
        protected services: Set<string>,
        protected restricted_services: Set<string>
    ) {
        super(state);
    }

    private serviceSet(t: Ticket) {
        return t.IsRestricted() ? this.restricted_services : this.services;
    }

    canAdd(t: Ticket) {
        const serviceSet = this.serviceSet(t);
        return t.services.some(s => serviceSet.has(s));
    }
}

export class WaitingQueue extends RestrcitedQueue {
    constructor(
        services: Set<string>,
        restricted_services: Set<string>
    ) {
        super(TicketStates.Waiting, services, restricted_services);
    }
}


export class MissedQueue extends RestrcitedQueue {
    constructor(
        services: Set<string>,
        restricted_services: Set<string>
    ) {
        super(TicketStates.Missed, services, restricted_services);
    }
}

export class ServingQueue extends TicketQueue {
    constructor(
        private counter_id: string
    ) {
        super(TicketStates.Serving);
    }

    canAdd(t: Ticket) {
        return this.counter_id == t.counter_id;
    }
}