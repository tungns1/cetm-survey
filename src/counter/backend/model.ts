import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Model, Backend } from '../shared';
export const RxCounters = new ReplaySubject<Model.House.ICounter[]>(1);

export const RxCurrentCounter = new ReplaySubject<Model.House.ICounter>(1);

export const RxServices = new ReplaySubject<Model.Center.IService[]>(1);
