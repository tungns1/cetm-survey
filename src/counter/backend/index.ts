export * from './socket';
export * from './model';
export { RxStat } from './stat';

import { Init, ITicket, AddTicket, RemoveTicket ,feedbackDone} from './queue';
import { socket } from './socket';
import { IStatMap, RxStat } from './stat';
import { RxCounters, RxCurrentCounter, RxServices, ICounter } from './model';
import { Model } from '../shared';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/delay';

socket.Subscribe<ICounter>("/counter", c => RxCurrentCounter.next(c));
socket.Subscribe<ICounter[]>("/counters", c => {
    c.sort((a, b) => {
        if (a.name.length === b.name.length) {
            return a.name < b.name ? -1 : 1;
        }
        return a.name.length < b.name.length ? -1 : 1;
    });
    RxCounters.next(c);
});

socket.Subscribe<any>("/tickets", Init);
socket.Subscribe<Model.House.ITicket>('/add_ticket', AddTicket);
socket.Subscribe<[Model.House.TicketState, string]>("/remove_ticket", ([prev, id]) => RemoveTicket(prev, id));
socket.Subscribe<Model.House.ITicket>("/feedback_done", t=>{ AddTicket(t),feedbackDone.next(true)});
socket.Subscribe<IStatMap>("/stat", stat => {
    RxStat.next(stat);
});

// set login user
import { RxMySetting, IMySettings } from '../../shared/session/';
import { combineLatest } from 'rxjs/observable/combineLatest';

combineLatest<boolean, IMySettings>(socket.rxConnected, RxMySetting).subscribe(([connected, my]) => {
    if (connected && my && my.me) {
        socket.Send("/set_user", { user_id: my.me.id }).subscribe();
    }
})

combineLatest<ICounter[], IMySettings>(RxCounters, RxMySetting)
    .subscribe(([counters, my]) => {
        if (my && my.services && counters) {
            const servicable = {}
            counters.forEach(c => {
                c.services.forEach(id => servicable[id] = true)
                c.vservices = c.vservices || []
                c.vservices.forEach(id => servicable[id] = true)
            })
            const services = my.services.filter(s => servicable[s.id])
            services.sort((a, b) => a.name > b.name ? 1 : -1);
            RxServices.next(services);
        }
    })


export * from './feedback';