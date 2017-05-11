import {
    ICounter, IUser,
    ITicket, IMapTicket, Ticket,
    TicketState, TicketStates
} from './shared';
import { TicketQueue, WaitingQueue, ServingQueue, MissedQueue } from './queue';
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

    Waiting = new WaitingQueue(this.current_counter.id, this.services, this.vip_services);
    Serving = new ServingQueue(this.current_counter.id);
    Missed = new MissedQueue(this.current_counter.id, this.services, this.vip_services);

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
        this.queues.forEach(q => q.Replace(t));

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