export interface IStat {
    service_id: string;
    state: TicketState;
    stime: number;
    count: number;
}

import { BehaviorSubject } from 'rxjs';
import { Ticket, TicketState, TicketStates } from './shared';

export class StatMap extends BehaviorSubject<Map<string, IStat>> {
    constructor(private state: TicketState) {
        super(new Map<string, IStat>());
    }

    total_count: number;
    total_stime: number;
    max_count: number;
    average_stime: number;

    Refresh(stats: IStat[]) {
        if (!stats) return;
        stats.forEach(v => {
            if (v && v.state == this.state) {
                this.value.set(v.service_id, v);
            }
        });
        this.update();
    }

    Add(stat: IStat) {
        if (!stat || stat.state !== this.state) return;
        let s = this.value.get(stat.service_id) || {
            service_id: stat.service_id,
            count: 0,
            stime: 0,
            state: stat.state
        }
        s.count += stat.count;
        s.stime += stat.stime;
        this.value.set(stat.service_id, s);
        this.update();
    }

    private update() {
        let count = 0;
        let stime = 0;
        let max_count = 0;
        this.value.forEach(d => {
            count += d.count || 0;
            stime += d.stime || 0;
            if (max_count < d.count) {
                max_count = d.count;
            }
        });
        this.total_count = count;
        this.total_stime = stime;
        this.average_stime = stime / count || 0;
        this.max_count = max_count;
        this.next(this.value);
    }

    ToArray() {
        return this.pipe(map(_ => Array.from(this.value.values())));
    }
}


import { ITicketAction, TicketAction } from './ticket_action';
import { map } from 'rxjs/operators';

export class CounterStatistics {
    constructor(private user_id: string, private _s: IStat[]) {
        this.finished.Refresh(_s);
        this.cancelled.Refresh(_s);
        this.update();
    }

    finished = new StatMap(TicketStates.Finished);
    cancelled = new StatMap(TicketStates.Cancelled);
    average_stime = 0;

    OnTicketAction(tAction: TicketAction) {
        if (!tAction || tAction.IsRestore()) return;
        const ticket = tAction.ticket;
        var len = ticket.tracks.length;
        ticket.addHelperFields();
        if (!ticket.isDone()) return;
        if (len <= 1) return;
        if (ticket.state === TicketStates.Waiting) {
            if (this.user_id === ticket.tracks[len - 2].user_id) {
                const s: IStat = {
                    service_id: ticket.tracks[len - 2].service_id,
                    count: 1,
                    stime: ticket.tracks[len - 2].mtime - ticket.tracks[len - 3].mtime,
                    state: ticket.tracks[len - 2].state
                }
                this.finished.Add(s);
                this.cancelled.Add(s);
            }

        } else {
            if (this.user_id === ticket.user_id) {
                if(ticket.tracks[len-2].state === TicketStates.Serving){
                    const s: IStat = {
                        service_id: ticket.service_id,
                        count: 1,
                        stime: ticket.__stime,
                        state: ticket.state
                    }
                    this.finished.Add(s);
                    this.cancelled.Add(s);
                }
            }

        }

        this.update();
    }

    private update() {
        const count = this.finished.total_count;
        const stime = this.finished.total_stime;
        this.average_stime = stime / count || 0;
    }
}