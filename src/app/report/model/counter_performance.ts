import { CacheBranch } from '../../shared/model';
import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum, filter, findIndex } from "lodash";
import { ICounterTrack } from './counter';
export interface IPerformance {
    activity: ICounterTrack[];
    performance: ICounterPerformance[];
}
export interface ICounterPerformance {
    id?: string;
    branch_id: string;
    user_id: string;
    user_code: string;
    user_name: string;
    counter_id: string;
    counter_name: string;
    date: string;
    stime: number;
    wtime: number;
    c_t: number;
    c_ft: number;

}
export interface ICPT {

    id?: string;
    branch_id: string;
    user_code: string;
    user_name: string;
    counter_name: string;
    date: string;
    total_connection_time: number;
    total_productivity_time: number;
    total_idle_time: number;
    ticket_attended: number;
    ticket_transferred: number;
    occupied?: number;
    survay_score?: number;
}



export class InfoPerformanceTrack {

    data: ICPT[] = [];

    Add(s: IPerformance) {
        var t_s = s.performance;
        var a_v = s.activity
        for (var i = 0; i < t_s.length; i++) {
            var index = findIndex(a_v, { bid: t_s[i].branch_id, eid: t_s[i].counter_id, date: t_s[i].date })
            if (index != -1) {
                var cp: ICPT = {
                    branch_id: t_s[i].branch_id,
                    user_code: t_s[i].user_code,
                    user_name: t_s[i].user_name,
                    counter_name: t_s[i].counter_name,
                    date: t_s[i].date,
                    total_connection_time: a_v[index].a_d,
                    total_productivity_time: t_s[i].stime,
                    total_idle_time: t_s[i].wtime,
                    ticket_attended: t_s[i].c_ft,
                    ticket_transferred: t_s[i].c_t - t_s[i].c_ft,
                }
                this.data.push(cp)
            }

        }
        this.data.sort(function (a, b) { return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0); });
    }

    SecondToHour(s: number) {
        return +(s / 3600).toFixed(2);
    }



    static Make(records: IPerformance) {
        console.log(records)
        let res = new InfoPerformanceTrack();
        if (records != null) {
            res.Add(records);
        }
        return res;
    }

}


