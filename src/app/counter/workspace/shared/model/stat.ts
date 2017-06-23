export interface IStat {
    service_id: string;
    state: TicketState;
    stime: number;
    count: number;
}

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
        return this.map(_ => Array.from(this.value.values()));
    }
}


import { ITicketAction, TicketAction } from './ticket_action';

export class CounterStatistics {
    constructor(private user_id: string, private _s: IStat[]) {
        this.finished.Refresh(_s);
        this.cancelled.Refresh(_s);
        this.update();
    }

    finished = new StatMap(TicketStates.Finished);
    cancelled = new StatMap(TicketStates.Cancelled);
    average_stime = 0;

    OnTicketAction(a: TicketAction) {
        console.log(a);
        if (!a) return;
        const t = a.ticket;
        var len = t.tracks.length;
        t.addHelperFields();
        if (!t.isDone() || this.user_id!=t.tracks[len-2].user_id) return;
      
        if (len <= 1) return;
        if (t.state === TicketStates.Waiting) {
            const s: IStat = {
                service_id: t.service_id,
                count: 1,
                stime: t.tracks[len - 2].mtime - t.tracks[len - 3].mtime,
                state: t.tracks[len - 2].state
            }
            this.finished.Add(s);
            this.cancelled.Add(s);
        } else {
            const s: IStat = {
                service_id: t.service_id,
                count: 1,
                stime: t.__stime,
                state: t.state
            }
            this.finished.Add(s);
            this.cancelled.Add(s);
        }

        this.update();
    }

    private update() {
        const count = this.finished.total_count;
        const stime = this.finished.total_stime;
        this.average_stime = stime / count || 0;
    }
}