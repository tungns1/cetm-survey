export * from './socket';
export * from './model';
export { RxStat } from './stat';

import { Init, ITicket, AddTicket, RemoveTicket} from './queue';
import { socket } from './socket';
import { IStatMap, RxStat } from './stat';
import { RxCounters, RxCurrentCounter } from './model';
import { Model } from '../shared';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/delay';

socket.Subscribe<Model.House.ICounter>("/counter", c => RxCurrentCounter.next(c));
socket.Subscribe<Model.House.ICounter[]>("/counters", c => RxCounters.next(c));

socket.Subscribe<any>("/tickets", Init);
socket.Subscribe<Model.House.ITicket>('/add_ticket', AddTicket);
socket.Subscribe<[Model.House.TicketState, string]>("/remove_ticket", ([prev, id]) => RemoveTicket(prev, id));

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