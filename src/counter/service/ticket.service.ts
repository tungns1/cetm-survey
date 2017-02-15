
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

import { ITicket } from '../model';
import { QueueService } from './queue.service';
import { WorkspaceService } from './workspace.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TicketService {
    constructor(
        private workspaceService: WorkspaceService,
        private queueService: QueueService
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

    Recall(t: ITicket) {
        return this.socket.Send('/recall', t.id).share();
    }

    Finish(t: ITicket) {
        return this.sendAction({
            action: ActionFinish,
            ticket_id: t.id,
        });
    }

    Miss(t: ITicket) {
        return this.sendAction({
            action: ActionMiss,
            ticket_id: t.id
        });
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

    autoNext$ = new BehaviorSubject<boolean>(false);

    SetAutoNext(b = false) {
        this.autoNext$.next(b);
    }

    private onInit() {
        // if auto next
        this.autoNext$.filter(a => a).switchMap(auto => {
            // if can next
            return this.queueService.canNext$.filter(b => b);
        }).switchMap(_ => {
            // the first ticket
            return this.queueService.waiting$.map(t => t[0]).first();
        }).switchMap(t => {
            // call the first ticket
            return this.CallFromWaiting(t);
        }).subscribe(v => {
            this.SetAutoNext(false);
        });
    }
}
