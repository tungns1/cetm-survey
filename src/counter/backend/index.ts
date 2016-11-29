export * from './socket';
export * from './model';
export { Queues } from './queue';
export { RxStat } from './stat';

import { Queues } from './queue';
import { socket } from './socket';
import { IStatMap, RxStat } from './stat';
import { RxCounters, RxServices, RxCurrentCounter } from './model';
import { Model } from '../shared';

socket.Subscribe<Model.ICounter>("/counter", c => RxCurrentCounter.next(c));
socket.Subscribe<Model.ICounter[]>("/counters", c => RxCounters.next(c));
socket.Subscribe<Model.ITicket>('/ticket', (ticket) => {
    Queues.forEach(q => q.update(ticket));
});

socket.Subscribe<Model.IService[]>("/services", s => {
    s.forEach(Model.AddServiceName);
    RxServices.next(s);
});

socket.Subscribe<IStatMap>("/stat", stat => {
    RxStat.next(stat);
});