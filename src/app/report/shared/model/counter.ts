import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum } from "lodash";
import { CacheBranch } from '../shared';
export interface ICounterTrack {
    id?: string
    bid: string;
    eid: string;
    cat: string;
    data: ICounterTrackData;
    name: string;
    s_at: number;
    e_at: number;
    a_d: number;
    date: string;

}

export interface ICounterTrackData {
    counternumber: string;
    userfullname: string;
    usercode:string;
    userid: string;
}





export class InfoCounterTrack {


}

