import {
    IMapTicket, ITicket, TicketStates
} from '../../shared';

import { ReplaySubject } from 'rxjs/ReplaySubject';
export class TicketGroup {
    constructor(
        private _data: IMapTicket
    ) { }

    Waiting$ = new ReplaySubject<ITicket[]>(1);
    Serving$ = new ReplaySubject<ITicket[]>(1);
    Missed$ = new ReplaySubject<ITicket[]>(1);
    Finished$ = new ReplaySubject<ITicket[]>(1);
    Cancelled$ = new ReplaySubject<ITicket[]>(1);

    Replace(t: ITicket) {
        if (!t) return;
        this.cache.set(t.id, t);
        this.aggregate();
    }

    private refresh(data: IMapTicket) {
        Object.keys(data).forEach(id => {
            this.cache.set(id, data[id]);
        });
        this.aggregate();
    }

    private aggregate() {
        this.Waiting$.next(this.getByState(TicketStates.Waiting));
        this.Serving$.next(this.getByState(TicketStates.Serving));
        this.Missed$.next(this.getByState(TicketStates.Missed));
        this.Finished$.next(this.getByState(TicketStates.Finished));
        this.Cancelled$.next(this.getByState(TicketStates.Cancelled));
    }

    private getByState(state: string) {
        return Array.from(this.cache.values())
            .filter(t => t.state === state)
            .sort((a, b) => {
                return a.ctime < b.ctime ? -1 : 1;
            });
    }

    private cache = new Map<string, ITicket>();
}

