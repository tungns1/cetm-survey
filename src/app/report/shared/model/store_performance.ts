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
    date: string;
    stime: number;
    attended: number;
    abandoned: number;
    teap: number;
    dap: number;
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
        var data_by_branh = toArray(groupBy(t_s, 'branch_id'));
        var len_by_branch = size(data_by_branh);

        for (var i = 0; i < len_by_branch; i++) {
            var store: ISPT = {
                branch_id: '',
                total_ticket: 0,
                avg_time: '',
                attended: 0,
                abandoned: 0,
                teap: 0,
                dap: 0,
                occupied: 0
            };
            var index = findIndex(a_v, { bid: t_s[i].branch_id })
            if (index != -1) {
                var data_by_date = toArray(groupBy(data_by_branh[i], 'date'));
                var len_by_date = size(data_by_date);
                var total_ticket = data_by_branh[i].length;
                var stime = 0, teap = 0, dap = 0;

                data_by_branh[i].forEach(v => {
                    store.attended += v.attended;
                    store.abandoned += v.abandoned;
                    store.branch_id = v.branch_id;
                    store.total_ticket = data_by_branh[i].length;
                    teap += v.teap * 100;
                    dap += v.dap * 100;
                    stime += v.stime * 100;
                })
                store.occupied = +(stime / a_v[index].a_d).toFixed(2);
                store.teap = +(teap / total_ticket).toFixed(2);
                store.dap = +(dap / total_ticket).toFixed(2);
                store.avg_time = this.SecondToHour(stime / len_by_date);
                this.data.push(store);
            }
        }

        // this.data.sort(function (a, b) { return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0); });
    }

    SecondToHour(s: number) {
        if (s > 0) {
            var d = new Date(s * 1000);
            return [d.getHours(), d.getMinutes(), d.getSeconds()].map(this.TwoDigit).join(":");
        } else {
            return "00:00:00";
        }
    }
    TwoDigit(n: number): string {
        n = Math.floor(n);
        return (n > 9 ? '' : '0') + n;
    }


    static Make(records: IStoreReport) {
        console.log(records)
        let res = new InfoStore();
        if (records != null) {
            res.Add(records);
        }
        return res;
    }

}

