export interface IBoxTicketSummary {
    bid: string;
    wai: number;
    ser: number;
    fin: number;
    mis: number;
    can: number;
    wai_l: number;
    ser_l: number;
}

function ToPercent(a: number, b: number) {
    if (b == 0) return 0;
    return Math.round(a / b * 10000) / 100;
}

export class BoxTicketSummary {
    constructor(private _s: IBoxTicketSummary) { }
    branch_id = this._s.bid;
    waiting = this._s.wai;
    serving = this._s.ser;
    finished = this._s.fin;
    missed = this._s.mis;
    cancelled = this._s.can;
    wait_long = this._s.wai_l;
    serve_long = this._s.ser_l;
    s_l_percent = ToPercent(this.serve_long, this.serving);
    w_l_percent = ToPercent(this.wait_long, this.waiting);
    printed = this.waiting + this.serving + this.finished + this.missed + this.cancelled;
}

import { ReplaySubject } from 'rxjs/ReplaySubject';

export class GlobalTicketSummary {
    private boxes = new Map<string, BoxTicketSummary>();

    Total$ = new ReplaySubject<BoxTicketSummary>(1);

    Refresh(box: IBoxTicketSummary[]) {
        if (!box) return;
        box.forEach(b => this.Replace(b));
        this.Total$.next(this.aggregate());
    }

    Replace(box: IBoxTicketSummary) {
        if (!box) return;
        const b = new BoxTicketSummary(box);
        this.boxes.set(b.branch_id, b);
        this.Total$.next(this.aggregate());
    }

    ToArray() {
        return Array.from(this.boxes.values());
    }

    private aggregate() {
        let waiting = 0;
        let serving = 0;
        let finished = 0;
        let missed = 0;
        let cancelled = 0;
        let wait_long = 0;
        let serve_long = 0;
        this.boxes.forEach(b => {
            waiting += b.waiting;
            serving += b.serving;
            finished += b.finished;
            missed += b.missed;
            cancelled += b.cancelled;
            wait_long += b.wait_long;
            serve_long += b.serve_long;
        });
        return new BoxTicketSummary({
            bid: "",
            wai: waiting,
            ser: serving,
            fin: finished,
            can: cancelled,
            mis: missed,
            wai_l: wait_long,
            ser_l: serve_long
        })
    }

}