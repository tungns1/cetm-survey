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

    waiting$ = this.getByState(TicketStates.Waiting);
    serving$ = this.getByState(TicketStates.Serving);
    missed$ = this.getByState(TicketStates.Missed);
    busy$ = this.serving$.map(s => s.length > 0);
    canNext$ = this.waiting$.map(data => data.length > 0)
        .combineLatest(this.busy$, (a, b) => a && !b);

}