import { CacheBranch } from '../shared';


import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum, filter, findIndex } from "lodash";
import { ICounterTrack } from './counter';
export interface IStoreReport {
    activity: ICounterTrack[];
    transaction: IStorePerformance[];
}
export interface IStorePerformance {
    id?: string;
    branch_id: string;
    t_ticket: number;
    t_stime: number;
    avg_stime: number;
    attended: number;
    abandoned: number;
    teap: number;
    dap: number;
    transfer: number;
}

export interface ISPT {
    id?: string;
    branch_id: string;
    avg_time: string;
    total_ticket: number;
    attended: number;
    abandoned: number;
    teap: number;
    dap: number;
    occupied?: number;
    survay_score?: number;
}



export class InfoStore {

    data: ISPT[] = [];

    Add(s: IStoreReport) {
        var t_s = s.transaction;
        var a_v = s.activity

        var len_t = size(t_s);
        var len_a = size(a_v);

        for (var i = 0; i < len_t; i++) {
            var a_d = 0
            var store: ISPT = {
                branch_id: t_s[i].branch_id,
                avg_time: "",
                attended: t_s[i].attended,
                abandoned: t_s[i].abandoned,
                total_ticket: t_s[i].attended + t_s[i].abandoned,
                teap: t_s[i].teap * 100,
                dap: t_s[i].dap * 100,
                occupied: 0
            };
            for (var i1 = 0; i1 < len_a; i1++) {
                if (a_v[i1].bid === t_s[i].branch_id) {
                    a_d = a_v[i1].a_d
                }
            }
            store.occupied = +(t_s[i].t_stime / a_d).toFixed(2) * 100;
            store.teap = +(store.teap / store.total_ticket).toFixed(2);
            store.dap = +(store.dap / store.total_ticket).toFixed(2);
            store.avg_time=this.SecondToHour((t_s[i].avg_stime)/store.total_ticket)
            this.data.push(store);
        }

        // this.data.sort(function (a, b) { return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0); });
    }

    SecondToHour(s: number) {
        if (s > 0) {
            return [s / 3600, (s % 3600) / 60, (s % 60)].map(this.TwoDigit).join(":");
        } else {
            return "00:00:00";
        }
    }
    TwoDigit(n: number): string {
        n = Math.floor(n);
        return (n > 9 ? '' : '0') + n;
    }


    static Make(records: IStoreReport) {
        let res = new InfoStore();
        if (records != null) {
            res.Add(records);
        }
        return res;
    }

}

