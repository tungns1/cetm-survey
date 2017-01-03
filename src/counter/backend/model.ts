import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Model, Backend } from '../shared';

export type ICounter = Model.House.ICounter;

export const RxCounters = new ReplaySubject<ICounter[]>(1);
export const RxCurrentCounter = new ReplaySubject<ICounter>(1);

export const RxServices = new ReplaySubject<Model.Center.IService[]>(1);
