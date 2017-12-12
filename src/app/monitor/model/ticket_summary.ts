export interface IBoxTicketSummary {
    bid: string;
    wai: number;
    ser: number;
    fin: number;
    mis: number;
    can: number;
    wai_l: number;
    wait_standard: number;
    ser_l: number;
    serve_standard: number;
    wai_bw_5_10: number;
    wai_bw_10_15: number;
    wai_bw_15_20: number;
    wai_bw_20_25: number;
    wai_bw_25_30: number;
    wai_over_30: number;
    wai_under_5: number;
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
    wait_standard = this._s.wai - this._s.wai_l;
    serve_long = this._s.ser_l;
    serve_standard = this._s.ser - this._s.ser_l;
    s_l_percent = ToPercent(this.serve_long, this.serving);
    w_l_percent = ToPercent(this.wait_long, this.waiting);
    printed = this.waiting + this.serving + this.finished + this.missed + this.cancelled;
    wai_bw_5_10 = this._s.wai_bw_5_10;
    wai_bw_10_15 = this._s.wai_bw_10_15;
    wai_bw_15_20 = this._s.wai_bw_15_20;
    wai_bw_20_25 = this._s.wai_bw_20_25;
    wai_bw_25_30 = this._s.wai_bw_25_30;
    wai_over_30 = this._s.wai_over_30;
    wai_under_5 = this._s.wai_under_5;
}

import { ReplaySubject } from 'rxjs/ReplaySubject';

export class GlobalTicketSummary {
    private boxes = new Map<string, BoxTicketSummary>();

    Refresh(box: IBoxTicketSummary[]) {
        if (box) {
            box.forEach(b => this.Replace(b));
        }
    }

    Replace(box: IBoxTicketSummary) {
        if (!box) return;
        const b = new BoxTicketSummary(box);
        this.boxes.set(b.branch_id, b);
    }

    ToArray() {
        return Array.from(this.boxes.values());
    }

    GetTotal() {
        let waiting = 0;
        let serving = 0;
        let finished = 0;
        let missed = 0;
        let cancelled = 0;
        let wait_long = 0;
        let wait_standard = 0;
        let serve_long = 0;
        let serve_standard = 0;
        let wai_bw_5_10 = 0;
        let wai_bw_10_15 = 0;
        let wai_bw_15_20 = 0;
        let wai_bw_20_25 = 0;
        let wai_bw_25_30 = 0;
        let wai_over_30 = 0;
        let wai_under_5 = 0;
        this.boxes.forEach(b => {
            waiting += b.waiting;
            serving += b.serving;
            finished += b.finished;
            missed += b.missed;
            cancelled += b.cancelled;
            wait_long += b.wait_long;
            wait_standard += b.wait_standard;
            serve_long += b.serve_long;
            serve_standard += b.serve_standard;
            wai_bw_5_10 += b.wai_bw_5_10;
            wai_bw_10_15 += b.wai_bw_10_15;
            wai_bw_15_20 += b.wai_bw_15_20;
            wai_bw_20_25 += b.wai_bw_20_25;
            wai_bw_25_30 += b.wai_bw_25_30;
            wai_over_30 += b.wai_over_30;
            wai_under_5 += b.wai_under_5;
        });
        return new BoxTicketSummary({
            bid: "",
            wai: waiting,
            ser: serving,
            fin: finished,
            can: cancelled,
            mis: missed,
            wai_l: wait_long,
            wait_standard: wait_standard,
            ser_l: serve_long,
            serve_standard: serve_standard,
            wai_bw_5_10: wai_bw_5_10,
            wai_bw_10_15: wai_bw_10_15,
            wai_bw_15_20: wai_bw_15_20,
            wai_bw_20_25: wai_bw_20_25,
            wai_bw_25_30: wai_bw_25_30,
            wai_over_30: wai_over_30,
            wai_under_5: wai_under_5
        })
    }

}