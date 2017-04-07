import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import {
    SortTicket,
    ITicket, TicketState, TicketStates, ITicketQueue, ITickets
} from '../../shared';
import { WorkspaceService } from './workspace.service';
import { of } from 'rxjs/observable/of';
import { SendToRecorder } from '../../../device';

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
        this.serving$.subscribe(SendToRecorder);
    }

    private socket = this.workspaceService.Socket;
    private initialQueue$ = this.socket.RxEvent<ITicketQueue>("/tickets");
    private addTicket$ = this.socket.RxEvent<ITicket>("/add_ticket");
    private removeTicket$ = this.socket.RxEvent<[TicketState, string]>("/remove_ticket");

    private getByState(state: TicketState) {
        return this.initialQueue$.switchMap(initial => {
            const data: ITickets = initial[state];
            return of(data).merge(this.addTicket$.filter(t => t.state === state).do(t => {
                t.priority = this.getPriority(t);
                data[t.id] = t;
            })).merge(this.removeTicket$.filter(v => v[0] === state).do(v => {
                delete data[v[1]];
            })).map(_ => {
                // console.log("====", state, "===", data);
                return Object.keys(data)
                    .map(id => data[id]).sort(SortTicket);
            });
        });
    }
    private getPriority(t: ITicket) {
        var priority = 0;
        if (t.ticket_priority != undefined) {
            if (t.ticket_priority.customer_vip != undefined && t.ticket_priority.customer_vip != "") {
                priority += parseInt(t.ticket_priority.customer_vip);
            } else if (t.ticket_priority.service_priority != undefined && t.ticket_priority.service_priority != "") {
                priority += parseInt(t.ticket_priority.service_priority);
            } else if (t.ticket_priority.ticket_online != undefined && t.ticket_priority.ticket_online != "") {
                priority += parseInt(t.ticket_priority.ticket_online);
            } else if (t.ticket_priority.vip_card != undefined && t.ticket_priority.vip_card != "") {
                priority += parseInt(t.ticket_priority.vip_card);
            }
            return priority;
        }

    }

    waiting$ = new ReplaySubject<ITicket[]>(1);
    serving$ = new ReplaySubject<ITicket[]>(1);
    missed$ = new ReplaySubject<ITicket[]>(1);
    busy$ = this.serving$.map(s => s.length > 0);
    canNext$ = this.waiting$.map(data => data.length > 0)
        .combineLatest(this.busy$, (a, b) => a && !b);

}