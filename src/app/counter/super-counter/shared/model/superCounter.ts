import {
    ICounter, IUser,
    ITicket, IMapTicket, Ticket,
    TicketState, TicketStates
} from '../../../shared/model/shared';
import { TicketQueue, WaitingQueue, ServingQueue, MissedQueue, CancelQueue } from '../../../shared/model/queue';
import { ITicketAction, TicketAction } from '../../../shared/model/ticket_action';
import { IStat, CounterStatistics } from '../../../shared/model/stat';

export interface ISuperCounterInitialState {
    user: IUser;
    counters: ICounter[];
    tickets: IMapTicket;
}

export class SuperCounter {
    constructor(
        private _instate: ISuperCounterInitialState
    ) {
        this.onInit(this._instate);
        this.Refresh(this._instate.tickets);
    }

    counterList: counterList;
    AutoNext = false;

    waiting = new TicketQueue('waiting');
    serving = new TicketQueue('serving');
    cancelled = new TicketQueue('cancelled');
    queue = [this.waiting, this.serving, this.cancelled]

    private onInit(data: ISuperCounterInitialState) {
        this.counterList = new counterList(data.counters);
        Object.keys(data.tickets).map(key => {
            if (data.tickets[key].state === 'serving') {
                this.Update(Object.assign({}, {
                    action: 'call',
                    ticket_id: key,
                    branch_id: data.tickets[key].branch_id,
                    ticket: data.tickets[key]
                }))
            }
        })
    }

    private Refresh(tickets: IMapTicket) {
        // this.last_ticket_update = Date.now();
        this.queue.forEach(q => q.Refresh(tickets));
    }

    Update(action: ITicketAction) {
        if (!action) return;
        this.counterList.Update(action);
        // this.updateTicketList(action);
        this.queue.forEach(q => q.Replace(new TicketAction(action).ticket));
    }
}

export class counterList {
    constructor(
        counters: ICounter[]
    ) {
        this.counters = counters.map(c => new counterDetail(c));
    }

    private counters: counterDetail[];

    ToArray() {
        return Array.from(this.counters);
    }

    Update(action: ITicketAction) {
        this.counters.forEach(c => {
            c.Update(action)
        });
    }

}

export class counterDetail {
    constructor(
        private counter: ICounter
    ) {
    }
    serving: ITicket;

    Update(act: ITicketAction) {
        if (this.counter.id !== act.ticket.counter_id) {
            return;
        }
        if (act.action === 'call' || act.action === 'recall') {
            this.serving = act.ticket;
        }
        else this.serving = null;
    }

    get counterID() {
        return this.counter.id;
    }

    get counterName() {
        return this.counter.name;
    }

    get counterNum() {
        return this.counter.cnum;
    }

    get ticketNum() {
        return this.serving == null ? '' : this.serving.cnum;
    }

    get createTime() {
        return this.serving == null ? '' : this.serving.ctime;
    }

    get serveTime() {
        return this.serving == null ? '' : this.serving.mtime
    }

    get phoneNum() {
        return this.serving == null ? '' : this.serving.customer.phone_number;
    }


}