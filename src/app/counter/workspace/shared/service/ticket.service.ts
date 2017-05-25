
const ActionCall = "call"
const ActionMiss = "miss"
const ActionCancel = "cancel"
const ActionRecall = "recall"
const ActionFinish = "finish"
const ActionMove = "move"

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

import { ITicket, Ticket, IService, TicketState, TicketStates } from '../shared';
import { Workspace } from '../model';
import { QueueService } from './queue.service';
import { WorkspaceService } from './workspace.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { FeedbackService } from './feedback.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { RecorderService } from './recorder.service';
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

@Injectable()
export class TicketService {
    constructor(
        private workspaceService: WorkspaceService,
        private recorderService: RecorderService,
        private feedbackService: FeedbackService,
        private queueService: QueueService
    ) {
        this.onInit();
    }

    private socket = this.workspaceService.Socket;

    private sendAction(body: TicketAction) {
        return this.socket.Send<ITicket>("/ticket", body).share();
    }

    Move(t: Ticket, services: string[], counters: string[]) {
        const a = new TicketAction(ActionMove, t);
        a.extra = { services, counters };
        return this.action$.next(a);
    }

    Search(cnum: string) {
        return this.socket.Send<ITicket[]>('/search', {
            cnum: cnum
        });
    }

    private onInit() {
        this.workspaceService.Workspace$.subscribe(w => {
            if (!w.AutoNext) return;
            if (!w.Waiting.is_empty && w.Serving.is_empty) {
                const t = w.Waiting.GetFirstTicket();
                this.TriggerAction("call", t);
            }
        });
        this.action$.switchMap(action => {
            return this.workspaceService.Workspace$.map(w => {
                return this.HandleAction(action, w);
            });
        }).subscribe();
    }

    TriggerAction(action: TicketActionName, ticket: Ticket) {
        if (!ticket) return of(null);
        const ta = new TicketAction(action, ticket);
        this.action$.next(ta);
        return ta.afterDone();
    }

    HandleAction(action: TicketAction, workspace: Workspace) {
        if (action.IsValid()) {
            console.log("action", action);
            this.sendAction(action).subscribe(t => {
                action.done.next(t);
            });
        } else {
            console.log("invalid action", action);
        }
    }

    private action$ = new Subject<TicketAction>();
}
