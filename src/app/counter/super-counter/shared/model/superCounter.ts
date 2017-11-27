import {
    ICounter, IUser,
    ITicket, IMapTicket, Ticket,
    TicketState, TicketStates, IService
} from '../../../shared/model/shared';
import { TicketQueue, WaitingQueue, ServingQueue, MissedQueue, CancelQueue } from '../../../shared/model/queue';
import { ITicketAction, TicketAction } from '../../../shared/model/ticket_action';
import { IStat, CounterStatistics } from '../../../shared/model/stat';

export interface IMarkAsCheck {
    counterID: string;
    ticketID: string;
}

export interface IHistory {
    '/mark_as_check': IMarkAsCheck[];
}

export interface ISuperCounterInitialState {
    user: IUser;
    counters: ICounter[];
    tickets: IMapTicket;
    services: IService[];
    history: IHistory;
}

export class SuperCounter {
    constructor(
        private _instate: ISuperCounterInitialState
    ) {
        // this.onInit(this._instate);
        this.Refresh(this._instate);
    }

    counterList: counterList;
    services = this._instate.services;
    AutoNext = false;
    waiting = new TicketQueue('waiting');
    serving = new TicketQueue('serving');
    cancelled = new TicketQueue('cancelled');
    private queue = [this.waiting, this.serving, this.cancelled]

    private Refresh(data: ISuperCounterInitialState) {
        this.counterList = new counterList(data.counters, data.tickets, data.history['/mark_as_check']);
        this.queue.forEach(q => q.Refresh(data.tickets));
    }

    Update(action: ITicketAction) {
        if (!action) return;
        this.counterList.Update(action);
        this.queue.forEach(q => q.Replace(new TicketAction(action).ticket));
    }


}

export class counterList {
    constructor(
        counters: ICounter[] = [],
        tickets: IMapTicket,
        markAsCheck: IMarkAsCheck[]
    ) {
        counters.sort((a, b) => a.cnum < b.cnum ? -1 : 1);
        this.counters = counters.map(c => new counterDetail(c));
        this.selectedCounter = this.counters[0];
        this.setAllTicket(tickets);
        this.setAllMark(markAsCheck);
    }

    selectedCounter: counterDetail = null;
    private counters: counterDetail[];

    setAllTicket(tickets) {
        Object.keys(tickets).map(key => {
            if (tickets[key].state === 'serving') {
                this.Update({
                    action: 'call',
                    ticket_id: key,
                    branch_id: tickets[key].branch_id,
                    ticket: tickets[key]
                })
            }
        })
    }

    setAllMark(markAsCheck: IMarkAsCheck[]) {
        if (markAsCheck) {
            markAsCheck.forEach(element => {
                this.Mark(element)
            });
        }
    }

    ToArray() {
        return Array.from(this.counters);
    }

    Update(action: ITicketAction) {
        this.counters.forEach(c => {
            c.Update(action);
            if (action.ticket.counter_id === c.counterID) {
                switch (action.action) {
                    case 'call':
                        c.state = 'calling';
                        break;
                    case 'cancel':
                        c.state = 'empty';
                        break;
                    case 'finish':
                        c.state = 'empty';
                        break;
                }
            }
        });
    }

    Mark(mark: IMarkAsCheck) {
        this.counters.forEach(c => {
            if (c.serving && c.counterID === mark.counterID && c.serving.id === mark.ticketID) {
                c.state = 'serving'
            }
        })
    }

    select(counter: counterDetail) {
        this.selectedCounter = counter;
    }

}

export type counterState = 'init' | 'calling' | 'serving' | 'empty';

export class counterDetail {
    constructor(
        private counter: ICounter
    ) {
        if (this.serving) this._state = 'serving';
    }
    serving: ITicket;
    private _state: counterState = 'init';

    Update(act: ITicketAction) {
        if (this.counter.id !== act.ticket.counter_id) {
            return;
        }
        if (act.action === 'call' || act.action === 'recall') {
            this.serving = act.ticket;
        }
        else this.serving = null;
    }

    set state(s: counterState) {
        this._state = s;
    }

    get state() {
        return this._state;
    }

    get id() {
        return this.counter.id;
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

    get counterState() {
        return this.state;
    }

    get ticketNum() {
        return this.serving == null ? '' : this.serving.cnum;
    }

    get createTime() {
        return this.serving == null ? '' : this.serving.ctime;
    }

    get serveTime() {
        return this.serving == null ? 0 : (this.serving.state === 'serving' ? this.serving.mtime : 0);
    }

    get phoneNum() {
        return this.serving == null ? '' : this.serving.customer.phone_number;
    }


}