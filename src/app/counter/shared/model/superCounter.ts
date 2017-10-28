import {
    ICounter, IUser,
    ITicket, IMapTicket, Ticket,
    TicketState, TicketStates
} from './shared';
import { TicketQueue, WaitingQueue, ServingQueue, MissedQueue, CancelQueue } from './queue';
import { ITicketAction, TicketAction } from './ticket_action';
import { IStat, CounterStatistics } from './stat';

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
    }

    counterList: counterList;
    private ticketList: ITicket[] = [];
    AutoNext = false;

    private onInit(data: ISuperCounterInitialState) {
        // this.ticketList = data.tickets.map(t);
        Object.keys(data.tickets).forEach(key => {
            this.ticketList.push(data.tickets[key])
        })
        this.counterList = new counterList(data.counters);
        Object.keys(data.tickets).map(key => {
            if (data.tickets[key].state === 'serving') {
                // console.log(data.tickets[key])
                this.Update(Object.assign({}, {
                    action: 'call',
                    ticket_id: key,
                    branch_id: data.tickets[key].branch_id,
                    ticket: data.tickets[key]
                }))
            }
        })
    }

    get ticketsToArray() {
        return Array.from(this.ticketList);
    }

    Update(action: ITicketAction) {
        if (!action) return;
        // const act = new TicketAction(action)
        this.counterList.Update(action)
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
        // this.counter = counter;
    }
    // counter: ICounter;
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

    get counterName() {
        return this.counter.name;
    }

    get ticketNum() {
        return this.serving == null ? '' : this.serving.cnum;
    }

    get createTime() {
        return this.serving == null ? '' : this.serving.ctime;
    }

    get phoneNum() {
        return this.serving == null ? '' : this.serving.customer.phone_number;
    }


}