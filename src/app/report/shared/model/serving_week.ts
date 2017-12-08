import { CacheBranch } from '../shared';

import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum, filter, findIndex } from "lodash";
import { ICounterTrack } from './counter';
export interface IServingWeek {
    id?: string;
    branch_id: string;
    ctime: string;
    t_ticket: number;
    avg_stime: number;
    attended: number;
    abandoned: number;
}

export interface ISPTS {
    id?: string;
    branch_id: string;
    ctime: string;
    avg_time: string;
    total_ticket: number;
    attended: number;
    abandoned: number;
}

export class InfoServingByWeek {
    data: ISPTS[] = [];

    Add(s: IServingWeek[]) {

        for (var i = 0; i < s.length; i++) {
            var a_d = 0
            var serving: ISPTS = {
                branch_id: s[i].branch_id,
                ctime: s[i].ctime,
                avg_time: "",
                attended: s[i].attended,
                abandoned: s[i].abandoned,
                total_ticket: s[i].attended + s[i].abandoned
            };
            serving.avg_time=this.SecondToHour((s[i].avg_stime)/serving.total_ticket)

            this.data.push(serving)
        }

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

    static Make(records: IServingWeek[]) {
        let res = new InfoServingByWeek();
        if (records != null) {
            res.Add(records);
        }
        return res;
    }
}