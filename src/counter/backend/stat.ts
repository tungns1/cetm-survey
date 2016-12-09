const TransactionStateFinished = "finished"
const TransactionStateCancelled = "cancelled"


export interface IStatMap {
    finished: { [index: string]: number };
    cancelled: { [index: string]: number };
}

export interface IStat {
    service_id: string;
    count: number;
}

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const RxStat = new BehaviorSubject<IStatMap>({ finished: {}, cancelled: {} });

export const RxFinished = RxStat.map(stat => {
    return Object.keys(stat.finished).map(id => {
        return <IStat>{
            service_id: id,
            count: stat.finished[id]
        }
    })
})


export const RxCancelled = RxStat.map(stat => {
    return Object.keys(stat.cancelled).map(id => {
        return <IStat>{
            service_id: id,
            count: stat.cancelled[id]
        }
    })
})

export function SumStat(stats: IStat[]) {
    let s = 0;
    stats.forEach(a => s += a.count);
    return s;
}
