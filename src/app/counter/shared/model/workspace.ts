import {
    ICounter, IUser,
    ITicket, IMapTicket, Ticket,
    TicketState, TicketStates
} from './shared';
import { TicketQueue, WaitingQueue, ServingQueue, MissedQueue, CancelQueue } from './queue';
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
    

    public storeServicable = this.allCounterServicable();

    private services = new Set<string>();
    private vip_services = new Set<string>();
    private priority_services = new Set<string>();
    private cache = new Map<string, Ticket>();

    private onInit(c: ICounter) {
        console.log(c)
        c.services = c.services || [];
        c.services.forEach(s => this.services.add(s));
        c.vservices = c.vservices || [];
        c.vservices.forEach(s => this.vip_services.add(s));
        c.pservices = c.pservices || [];
        c.pservices.forEach(s => this.priority_services.add(s));
        console.log(this.priority_services)
    }

    Waiting = new WaitingQueue(this.current_counter.id, this.services, this.vip_services);
    Serving = new ServingQueue(this.current_counter.id);
    Missed = new MissedQueue(this.current_counter.id, this.services, this.vip_services);
    Cancel = new CancelQueue(this.current_counter.id, this.services, this.vip_services);

    private queues: TicketQueue[] = [
        this.Waiting, this.Serving, this.Missed, this.Cancel
    ]

    private Refresh(tickets: IMapTicket) {
        this.last_ticket_update = Date.now();
        this.queues.forEach(q => q.Refresh(tickets));
    }

    Update(a: ITicketAction) {
        if (!a) return;
        this.last_ticket_update = Date.now();
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

    AutoNext = false;
    private last_ticket_update = 0;

    get LastUpdate() {
        return this.last_ticket_update
    }

    get is_busy() {
        return !this.Serving.is_empty;
    }

    private allCounterServicable() {
        const servicable = new Set<string>();
        this.counters.forEach(c => {
            c.services.forEach(id => servicable.add(id));
            c.vservices = c.vservices || []
            c.vservices.forEach(id => servicable.add(id));
        });
        return servicable;
    }
}