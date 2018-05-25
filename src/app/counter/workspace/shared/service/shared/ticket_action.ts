export type TicketActionName = 'call' | 'recall' | 'finish' | 'cancel' | 'move' | 'restore' | 'miss' | 'create' | 'print_form';

import { ITicket, Ticket, IService, TicketState, TicketStates } from '../../shared';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

const TicketStateTransitions = new Map<TicketState, TicketState[]>();
TicketStateTransitions.set(TicketStates.Waiting, [TicketStates.Waiting, TicketStates.Serving, TicketStates.Cancelled]);
TicketStateTransitions.set(TicketStates.Serving, [TicketStates.Waiting, TicketStates.Serving, TicketStates.Finished, TicketStates.Cancelled, TicketStates.Missed]);
TicketStateTransitions.set(TicketStates.Cancelled, [TicketStates.Waiting]);
TicketStateTransitions.set(TicketStates.Missed, [TicketStates.Serving]);

const NextStates = new Map<TicketActionName, TicketState>();
NextStates.set("call", TicketStates.Serving);
NextStates.set("recall", TicketStates.Serving);
NextStates.set("move", TicketStates.Waiting);
NextStates.set("finish", TicketStates.Finished);
NextStates.set("cancel", TicketStates.Cancelled);
NextStates.set("restore", TicketStates.Waiting);
NextStates.set("miss", TicketStates.Missed);

export class TicketAction {
    constructor(
        public action: TicketActionName,
        public ticket: Ticket,
        public counter: string
    ) { }

    state = this.ticket.state;
    ticket_id = this.ticket.id;
    service_id = this.ticket.service_id || this.ticket.services[0];
    counter_id = this.counter;
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

    Done(result: ITicket) {
        this.done$.next(result);
    }

    Error(e: any) {
        console.log("error", e, this);
        this.done$.error(e);
    }

    afterDone() {
        return this.done$.first();
    }


    private done$ = new ReplaySubject<ITicket>(1);
}

import { Observable } from 'rxjs/Observable';
import { ActionMove } from '../../../../shared/model/ticket_action';

export class ActionManager {
    constructor(
        private handler: (ta: TicketAction) => Observable<ITicket>
    ) { }

    private queue: TicketAction[] = [];
    private error_list = [];
    LongErrorList$ = new Subject();

    Work(action: TicketActionName, ticket: Ticket, extra?: any, counter?: string) {
        if (!ticket) return of(null);
        const ta = new TicketAction(action, ticket, counter);
        if (action === 'print_form') {
            ta.extra = extra;
            this.queue.push(ta);
            this.next();
            return ta.afterDone();
        }
        if(action === ActionMove){
            ta.service_id = extra.services[0];
            ta.ticket.service_id = extra.services[0];
        }
        if (!ta.IsValid()) {
            console.log("invalid action", ta);
            return of(null);
        }
        ta.extra = extra;
        this.queue.push(ta);
        this.next();
        return ta.afterDone();
    }

    private Handle(ta: TicketAction) {
        return this.handler(ta);
    }

    private next() {
        if (this.queue.length < 1) return;
        const ta = this.queue.shift();
        if (!this.handler) {
            this.next();
        }
        this.Handle(ta).subscribe(result => {
            ta.Done(result);
            this.next();
        }, e => {
            ta.Error(e);
            this.addError(e);
            this.next();
        });
    }

    private addError(e) {
        var now = Date.now();
        var lastHour = now - 3600 * 1000;
        this.error_list.push(now);
        this.error_list = this.error_list.filter(timestamp => timestamp > lastHour);
        if (this.error_list.length > 6) {
            this.LongErrorList$.next(null);
        }
    }
}