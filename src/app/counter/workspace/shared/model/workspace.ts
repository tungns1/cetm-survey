import {
    ICounter, IUser,
    ITicket, IMapTicket, Ticket,
    TicketState, TicketStates
} from './shared';
import { TicketQueue } from './queue';
import { ITicketAction, TicketAction } from './ticket_action';
import { IStat, CounterStatistics } from './stat';

export interface IWorkspaceInitialState {
    user: IUser;
    current_counter: ICounter;
    counters: ICounter[];
    tickets: IMapTicket;
    stat: IStat[];
}

export class Workspace {
    constructor(
        private _instate: IWorkspaceInitialState
    ) {
        this.onInit(this.current_counter);
        this.Refresh(this._instate.tickets);
    }

    public current_counter = this._instate.current_counter;
    public counters = this._instate.counters;
    public user = this._instate.user;
    public stat = new CounterStatistics(this.user.id, this._instate.stat);

    private services = new Set<string>();
    private vip_services = new Set<string>();
    private cache = new Map<string, Ticket>();

    private onInit(c: ICounter) {
        c.services = c.services || [];
        c.services.forEach(s => this.services.add(s));
        c.vservices = c.vservices || [];
        c.vservices.forEach(s => this.vip_services.add(s));
    }

    private canServe(services: string[] = []) {
        return services.some(s => this.services.has(s));
    }

    private canAdd(t: Ticket) {
        if (t.state == TicketStates.Serving) {
            return t.counter_id == this.current_counter.id;
        }
        if (t.state == TicketStates.Waiting || t.state == TicketStates.Missed) {
            return this.canServe(t.services);
        }
        return true;
    }

    Waiting = new TicketQueue(TicketStates.Waiting);
    Serving = new TicketQueue(TicketStates.Serving);
    Missed = new TicketQueue(TicketStates.Missed);

    private queues: TicketQueue[] = [
        this.Waiting, this.Serving, this.Missed
    ]

    private Refresh(tickets: IMapTicket) {
        this.queues.forEach(q => q.Refresh(tickets));
    }

    Update(a: ITicketAction) {
        if (!a) return;
        const action = new TicketAction(a);
        const t = action.ticket;
        if (this.canAdd(t)) {
            this.queues.forEach(q => q.Replace(t));
        }
        this.stat.OnTicketAction(action);
    }

    GetServicable(services: string[]) {
        for (let i = 0; i < services.length; i++) {
            if (this.services.has(services[i])) {
                return services[i];
            }
        }
        return null;
    }
}