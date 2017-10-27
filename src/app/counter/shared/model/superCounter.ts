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
        // this.onInit(this.current_counter);
        // this.Refresh(this._instate.tickets);
        this.onInit(this._instate);
    }

    counterList: counterList;
    AutoNext = false;

    onInit(data: ISuperCounterInitialState) {
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
}