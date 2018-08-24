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
        return Array.from(this.data.values()).sort(Ticket.sort);
    }

    GetFirstTicket() {
        return this.ToArray()[0];
    }

    GetSecondTicket(){
        return this.ToArray()[1]
    }
}

class RestrictedQueue extends TicketQueue {
    constructor(
        state: TicketState,
        protected counter_id: string,
        protected services: Set<string>,
        protected restricted_services: Set<string>
    ) {
        super(state);
    }

    private serviceSet(t: Ticket) {
        return t.priority.isRestricted() ? this.restricted_services : this.services;
    }

    canAdd(t: Ticket) {
        if (t.counters && t.counters.length > 0) {
            return t.counters.some(c => c == this.counter_id);
        }
        const serviceSet = this.serviceSet(t);
        return t.services.some(s => serviceSet.has(s));
    }
}

export class WaitingQueue extends RestrictedQueue {
    constructor(
        counter_id: string,
        services: Set<string>,
        restricted_services: Set<string>,
        private priority_service: Set<string>
    ) {
        super(TicketStates.Waiting, counter_id, services, restricted_services);
    }

    ToArray() {
        // sort priority service
        let priorityServiceTicket = Array.from(this.data.values()).filter(ticket => {
            return !!this.priority_service.has(ticket.services[ticket.services.length - 1])
        }).sort(Ticket.sort);
        let normalServiceTicket = Array.from(this.data.values()).filter(ticket => {
            return !this.priority_service.has(ticket.services[ticket.services.length - 1])
        }).sort(Ticket.sort);
        return [].concat(priorityServiceTicket, normalServiceTicket);
    }

}


export class MissedQueue extends RestrictedQueue {
    constructor(
        counter_id: string,
        services: Set<string>,
        restricted_services: Set<string>
    ) {
        super(TicketStates.Missed, counter_id, services, restricted_services);
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

export class CancelQueue extends RestrictedQueue {
    constructor(
        counter_id: string,
        services: Set<string>,
        restricted_services: Set<string>
    ) {
        super(TicketStates.Cancelled, counter_id, services, restricted_services);
    }
}