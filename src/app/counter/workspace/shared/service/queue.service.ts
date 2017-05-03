import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import {
    ITicket, TicketState, TicketStates, IMapTicket
} from '../shared';
import { SortTicket, ITicketQueue, ITickets } from '../model';
import { WorkspaceService } from './workspace.service';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';


class TicketQueue {
    constructor(private state: TicketState) { }
    private data = new Map<string, ITicket>();

    Refresh(tickets: IMapTicket) {
        if (!tickets) return;
        this.data = new Map<string, ITicket>();
        Object.keys(tickets).forEach(id => {
            this.Add(tickets[id]);
        });
    }

    Add(t: ITicket) {
        if (!t) return;
        this.data.set(t.id, t);
    }

    Remove(state: TicketState, id: string) {
        if (state !== this.state) return;
        this.data.delete(id);
    }

    ToArray() {
        return Array.from(this.data.values()).sort(SortTicket);
    }
}

@Injectable()
export class QueueService {
    constructor(
        private workspaceService: WorkspaceService
    ) {
        this.onInit();
    }

    private onInit() {
        this.getByState(TicketStates.Waiting).subscribe(this.waiting$);
        this.getByState(TicketStates.Serving).subscribe(this.serving$);
        this.getByState(TicketStates.Missed).subscribe(this.missed$);
    }

    private socket = this.workspaceService.Socket;
    private initialQueue$ = this.socket.RxEvent<ITicketQueue>("/tickets");
    private addTicket$ = this.socket.RxEvent<ITicket>("/add_ticket");
    private removeTicket$ = this.socket.RxEvent<[TicketState, string]>("/remove_ticket");

    private getByState(state: TicketState) {
        return this.initialQueue$.switchMap(initial => {
            const queue = new TicketQueue(state);
            queue.Refresh(initial[state]);
            const addTicket = this.addTicket$.filter(t => t.state === state).do(t => {
                queue.Add(t);
            });
            const removeTicket = this.removeTicket$.filter(v => v[0] === state).do(v => {
                queue.Remove(v[0], v[1]);
            });
            return merge(of(null), addTicket, removeTicket).map(_ => {
                return queue.ToArray();
            });
        });
    }
    waiting$ = new ReplaySubject<ITicket[]>(1);
    serving$ = new ReplaySubject<ITicket[]>(1);
    missed$ = new ReplaySubject<ITicket[]>(1);
    busy$ = this.serving$.map(s => s.length > 0);
    canNext$ = this.waiting$.map(data => data.length > 0)
        .combineLatest(this.busy$, (a, b) => a && !b);

}