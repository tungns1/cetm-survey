import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Model, Backend } from '../shared';
export const RxCounters = new ReplaySubject<Model.House.ICounter[]>(1);

export const RxCurrentCounter = new ReplaySubject<Model.House.ICounter>(1);
let currentCounter: Model.House.ICounter = null;
RxCurrentCounter.subscribe(c => currentCounter = c);
export function CurrentCounterID() {
    return currentCounter? currentCounter.id : null;
}
