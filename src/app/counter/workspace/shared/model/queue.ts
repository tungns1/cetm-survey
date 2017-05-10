import { TicketState, Ticket, IMapTicket, ITicket } from './shared';

export class TicketQueue {
    constructor(private state: TicketState) { }
    private data = new Map<string, Ticket>();

    Refresh(tickets: IMapTicket) {
        if (!tickets) return;
        this.data = new Map<string, Ticket>();
        Object.keys(tickets).forEach(id => {
            this.Replace(tickets[id]);
        });
    }

    Replace(t: ITicket) {
        if (!t) return;
        const _t = new Ticket(t);
        if (t.state == this.state) {
            this.data.set(t.id, _t);
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