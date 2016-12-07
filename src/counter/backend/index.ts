export * from './socket';
export * from './model';
export { Queues } from './queue';
export { RxStat } from './stat';

import { Queues, Init } from './queue';
import { socket } from './socket';
import { IStatMap, RxStat } from './stat';
import { RxCounters, RxServices, RxCurrentCounter } from './model';
import { Model } from '../shared';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/delay';

socket.Subscribe<Model.ICounter>("/counter", c => RxCurrentCounter.next(c));
socket.Subscribe<Model.ICounter[]>("/counters", c => RxCounters.next(c));
socket.Subscribe<{ [index: string]: Model.ITicket }>("/tickets", v => {
    RxServices.first().delay(250).subscribe(_ => Init(v));
});

socket.Subscribe<Model.ITicket>('/ticket', (ticket) => {
    Queues.forEach(q => q.update(ticket));
});

socket.Subscribe<Model.Center.IService[]>("/services", s => {
    s.forEach(Model.Center.AddServiceName);
    RxServices.next(s);
});

socket.Subscribe<IStatMap>("/stat", stat => {
    RxStat.next(stat);
});

// set login user
import { RxMySetting, IMySettings } from '../../shared/session/';
import { combineLatest } from 'rxjs/observable/combineLatest';

combineLatest<boolean, IMySettings>(socket.rxConnected, RxMySetting).subscribe(([connected, my]) => {
    if (connected && my && my.me) {
        socket.Send("/set_user", {user_id: my.me.id}).subscribe();
    }
})