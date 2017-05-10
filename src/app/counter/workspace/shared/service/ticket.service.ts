
const ActionCall = "call"
const ActionMiss = "miss"
const ActionCancel = "cancel"
const ActionRecall = "recall"
const ActionFinish = "finish"
const ActionMove = "move"

interface ITicketAction<T> {
    action: string;
    ticket_id: string;
    service_id?: string;
    state?: string;
    services?: string[];
    counters?: string[];
    extra?: T;
}


import { ITicket, Ticket, IService } from '../shared';
import { QueueService } from './queue.service';
import { WorkspaceService } from './workspace.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { FeedbackService } from './feedback.service';

import { combineLatest } from 'rxjs/observable/combineLatest';

class TicketAction {
    constructor(
        private action: string,
        ticket: Ticket
    ) {
        this.setTicket(ticket);
    }

    private setTicket(t: Ticket) {
        this.state = t.state;
        this.ticket_id = t.id;
        this.service_id = t.service_id || t.services[0];
    }

    state: string;
    ticket_id: string;
    service_id: string;
    extra: any;
}

@Injectable()
export class TicketService {
    constructor(
        private workspaceService: WorkspaceService,
        private feedbackService: FeedbackService,
        private queueService: QueueService
    ) {
        this.onInit();
    }

    private socket = this.workspaceService.Socket;

    private sendAction(body: TicketAction) {
        return this.socket.Send("/ticket", body).share();
    }

    Remind(t: Ticket) {
        return this.socket.Send('/reminder', {
            ticket_id: t.id
        }).share();
    }

    RecallAll() {
        return this.updateServing(ActionRecall);
    }

    get serving$() {
        return this.queueService.serving$.first();
    }

    private updateServing(action: string) {
        return this.serving$.switchMap(t => {
            if (!t || !t[0]) {
                return of(null);
            }
            return this.sendAction(
                new TicketAction(action, t[0])
            )
        })
    }

    CheckFeedbackDone() {
        return this.serving$.switchMap(t => {
            return this.feedbackService.CheckFeedback(t);
        });
    }

    CheckFeedbackAndFinishAll() {
        return this.CheckFeedbackDone().switchMap(t => {
            if (!t) {
                return of(false);
            }
            if (t[0]) {
                return this.sendAction(
                    new TicketAction(ActionFinish, t[0])
                ).map(_ => true);
            }
            return of(true);
        });
    }

    MissAll() {
        return this.updateServing(ActionMiss);
    }

    CallTicket(t: Ticket) {
        return this.sendAction(
            new TicketAction(ActionCall, t)
        );
    }

    Cancel(t: Ticket) {
        return this.sendAction(
            new TicketAction(ActionCancel, t)
        );
    }

    Move(t: Ticket, services: string[], counters: string[]) {
        const a = new TicketAction(ActionMove, t);
        a.extra = { services, counters };
        return this.sendAction(a);
    }

    Search(cnum: string) {
        return this.socket.Send<ITicket[]>('/search', {
            cnum: cnum
        });
    }

    Skip(username: string, password: string, ticket_id: string) {
        return this.socket.Send<boolean>('/skip', {
            username: username,
            password: password,
            ticket_id: ticket_id
        });
    }

    autoNext$ = new Subject<boolean>();

    SetAutoNext(b = false) {
        this.autoNext$.next(b);
    }

    private onInit() {
        // if auto next
        combineLatest(this.autoNext$, this.workspaceService.Workspace$)
            .subscribe(([autoNext, w]) => {
                console.log(autoNext, w);
                if (autoNext && w.Serving.is_empty && !w.Waiting.is_empty) {
                    this.CallTicket(w.Waiting.GetFirstTicket()).subscribe(_ => {
                        this.SetAutoNext(false);
                    })
                }
            });
    }
}
