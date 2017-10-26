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
        this.onInit(this._instate)
    }

    counterList: counterList;
    AutoNext = false;

    onInit(data: ISuperCounterInitialState) {
        this.counterList = new counterList(data.counters);
        
    }

    Update(action: ITicketAction) {
        if (!action) return;
        // const act = new TicketAction(action)
        this.counterList.Update(action.ticket)
    }
}

export class counterList {
    constructor(
        counters: ICounter[]
    ) {
        this.counters = counters.map(c => new counterDetail(c));
    }

    counters: counterDetail[];

    Update(ticket: ITicket) {
        this.counters.forEach(c => c.Update(ticket));
    }

}

export class counterDetail {
    constructor(
        private Counter: ICounter
    ) {
    }

    serving: ITicket;


    Update(ticket: ITicket) {
        
    }
}