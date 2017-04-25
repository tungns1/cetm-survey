
const ActionCallWaiting = "call_from_waiting"
const ActionCallMissed = "call_from_missed"
const ActionCancel = "cancel"
const ActionMiss = "miss"
const ActionRecall = "recall"
const ActionFinish = "finish"
const ActionMove = "move"

interface ITicketAction {
    action: string;
    ticket_id: string;
    counter_id?: string;
    services?: string[];
    counters?: string[];
}

import { ITicket, IService, HttpServiceGenerator } from '../shared';
import { QueueService } from './queue.service';
import { WorkspaceService } from './workspace.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { FeedbackService } from './feedback.service';

@Injectable()
export class TicketService {
    constructor(
        private workspaceService: WorkspaceService,
        private feedbackService: FeedbackService,
        private queueService: QueueService,
        private httpServiceGenerator: HttpServiceGenerator
    ) {
        this.onInit();
    }

    private socket = this.workspaceService.Socket;

    private sendAction(body: ITicketAction) {
        return this.socket.Send("/ticket", body).share();
    }

    Remind(t: ITicket) {
        return this.socket.Send('/reminder', {
            ticket_id: t.id
        }).share();
    }

    RecallAll() {
        return this.serving$.switchMap(t => {
            if (!t || !t[0]) {
                return of(null)
            }
            return this.socket.Send('/recall', t[0].id)
        });
    }

    get serving$() {
        return this.queueService.serving$.first();
    }

    private updateServing(action: string) {
        return this.serving$.switchMap(t => {
            if (!t || !t[0]) {
                return of(null);
            }
            return this.sendAction({
                action: action,
                ticket_id: t[0].id
            })
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
                return this.sendAction({
                    action: ActionFinish,
                    ticket_id: t[0].id
                }).map(_ => true);
            }
            return of(true);
        });
    }

    MissAll() {
        return this.updateServing(ActionMiss);
    }

    CallFromMissed(t: ITicket) {
        return this.sendAction({
            action: ActionCallMissed,
            ticket_id: t.id
        });
    }

    Cancel(t: ITicket) {
        return this.sendAction({
            action: ActionCancel,
            ticket_id: t.id
        });
    }


    CallFromWaiting(t: ITicket) {
        return this.sendAction({
            action: ActionCallWaiting,
            ticket_id: t.id
        });
    }

    Move(t: ITicket, services: string[], counters: string[]) {
        return this.socket.Send('/move_ticket', {
            ticket_id: t.id,
            counters: counters,
            services: services
        }).share();
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

    GetService(id: string) {
       return this.api.Get<IService>("get", { id: id});
    }

    private onInit() {
        // if auto next
        this.autoNext$.throttleTime(100).switchMap(auto => {
            if (!auto) {
                return of();
            }
            // wait until not busy
            return this.queueService.busy$.filter(b => !b).first().switchMap(_ => {
                // the first ticket
                return this.queueService.waiting$.filter(t => t.length > 0).map(t => t[0]).first().throttleTime(250).switchMap(t => {
                    // call the first ticket
                    return this.CallFromWaiting(t);
                }).do(_ => this.SetAutoNext(false));
            });
        }).subscribe();
    }
    api = this.httpServiceGenerator.make<any>("/api/admin/center/service");
}
