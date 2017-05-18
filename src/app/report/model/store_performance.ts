import { CacheBranch } from '../../shared/model';
import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum, filter, findIndex } from "lodash";
import { ICounterTrack } from './counter';
export interface IStore {
    activity: ICounterTrack[];
    performance: IStorePerformance[];
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
    avg_time: number;
    attended: number;
    abandoned: number;
    teap: number;
    dap: number;
    occupied?: number;
    survay_score?: number;
}



export class InfoPerformanceTrack {

    data: ISPT[] = [];

    Add(s: IStore) {
        var t_s = s.performance;
        var a_v = s.activity
        var data_by_branh = toArray(groupBy(t_s, 'branch_id'));
        var len_by_branch = size(data_by_branh);
        for (var i = 0; i < len_by_branch; i++) {
            var store: ISPT = null;
            var data_by_date = toArray(groupBy(data_by_branh[i], 'date'));
            var len_by_date = size(data_by_date);
            var stime = 0
            data_by_branh[i].forEach(v => {
                store.attended += v.attended;
                store.abandoned += v.abandoned;
                store.branch_id = v.branch_id;
                store.teap += v.teap;
                store.dap += v.dap;
                stime += v.stime;
            })
            store.avg_time=stime/len_by_date;
        }
        // this.data.sort(function (a, b) { return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0); });
    }

    SecondToHour(s: number) {
        return +(s / 3600).toFixed(2);
    }



    static Make(records: IStore) {
        console.log(records)
        let res = new InfoPerformanceTrack();
        if (records != null) {
            res.Add(records);
        }
        return res;
    }

}


