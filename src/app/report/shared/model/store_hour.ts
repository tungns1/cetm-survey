import { CacheBranch } from '../../shared';
import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum, filter, findIndex } from "lodash";
import { ICounterTrack } from './counter';
export interface IStoreHour {
    id?: string;
    branch_id: string;
    printed_ticket:number;
    exceeded:number;
    completed:number;
    substandard:number;
    cancelled:number;
    discarded:number;
    date: string;
    stime: number;
    avg_stime:number;
    wtime:number;
    avg_wtime:number;
    attended: number;
    abandoned: number;
    hour:number;
    ctime:string;
    teap: number;
    dap: number;
    duration:string;
    discarded_percent:number;
    exceeded_percent:number;
}



export class InfoStoreByHour {

    data: IStoreHour[] = [];

    Add(s: IStoreHour) {
      

        // this.data.sort(function (a, b) { return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0); });
    }

    SecondToHour(s: number) {
        return +(s / 3600).toFixed(2);
    }



    static Make(records: IStoreHour) {
        console.log(records)
        let res = new InfoStoreByHour();
        if (records != null) {
            res.Add(records);
        }
        return res;
    }

}


