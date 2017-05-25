export type TicketActionName = 'call' | 'recall' | 'finish' | 'cancel' | 'move' | 'restore'

interface ITicketAction<T> {
    action: string;
    ticket_id: string;
    service_id?: string;
    state?: string;
    services?: string[];
    counters?: string[];
    extra?: T;
}

import { ITicket, Ticket, IService, TicketState, TicketStates } from '../../shared';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { AsyncSubject } from 'rxjs/AsyncSubject';

const TicketStateTransitions = new Map<TicketState, TicketState[]>();
TicketStateTransitions.set(TicketStates.Waiting, [TicketStates.Serving, TicketStates.Cancelled]);
TicketStateTransitions.set(TicketStates.Serving, [TicketStates.Serving, TicketStates.Finished, TicketStates.Cancelled]);
TicketStateTransitions.set(TicketStates.Cancelled, [TicketStates.Waiting]);

const NextStates = new Map<TicketActionName, TicketState>();
NextStates.set("call", TicketStates.Serving);
NextStates.set("recall", TicketStates.Serving);
NextStates.set("move", TicketStates.Waiting);
NextStates.set("finish", TicketStates.Finished);
NextStates.set("cancel", TicketStates.Cancelled);
NextStates.set("restore", TicketStates.Waiting);

export class TicketAction {
    constructor(
        public action: TicketActionName,
        public ticket: Ticket
    ) { }

    state = this.ticket.state;
    ticket_id = this.ticket.id;
    service_id = this.ticket.service_id;
    extra: any;

    static checkTransition(current: TicketState, next: TicketState) {
        const states = TicketStateTransitions.get(current)
        if (!states) return false;
        return states.indexOf(next) !== -1;
    }

    IsValid() {
        const current = this.state;
        const next = NextStates.get(this.action);
        return TicketAction.checkTransition(current, next);
    }

    done = new AsyncSubject<ITicket>();

    afterDone() {
        return this.done;
    }
}

import {Observable} from 'rxjs/Observable';

export class ActionManager {
    constructor(
        private handler: (ta: TicketAction) => Observable<ITicket> 
    ) {}

    Work(action: TicketActionName, ticket: Ticket) {
        if (!ticket) return of(null);
        const ta = new TicketAction(action, ticket);
        if (!ta.IsValid()) {
            return of(null);
        }
            this.queue.push(ta);
            this.next();
        return ta.afterDone();
    }

    private next() {
        if (this.queue.length < 1) return;
        const ta = this.queue.shift();
        if (!this.handler) {
            this.next();
        }
        this.handler(ta).subscribe(_ => {
            this.next();
        }, _ => this.next());
    }

    private queue: TicketAction[] = [];
}