import { Injectable } from '@angular/core';
import { SharedService, Model } from '../../shared';
import { Store } from '@ngrx/store';
import {
    ICounter, ITicketQueue, ITicket,
    TicketState, IStatMap,
    CounterStateService
} from '../../shared';

const SOCKET_LINK = "/room/counter/join";
const SOCKET_PARAMS = ['branch_code', 'counter_code']

@Injectable()
export class WorkspaceService {
    constructor(
        private stateService: CounterStateService,
        private authService: SharedService.Auth.AuthService
    ) { }

    private socket = new SharedService.Backend.AppSocket(SOCKET_LINK, SOCKET_PARAMS);

    get Socket() {
        return this.socket;
    }

    onInit(data) {
        this.socket.Connect(data);
        this.socket.disableCheckAlive();
        this.setUser();
    }

    onDestroy() {
        this.socket.Terminate();
    }

    currentCounter$ = this.socket.RxEvent<ICounter>("/counter");
    counters$ = this.socket.RxEvent<ICounter[]>("/counters");

    feedbackDone$ = this.socket.RxEvent<ITicket>("/feedback_done").share();
    stat$ = this.socket.RxEvent<IStatMap>("/stat").share();

    private setUser() {
        this.socket.Connected$.switchMap(() => {
            return this.authService.RxMySetting.switchMap(my => {
                return this.socket.Send("/set_user", { user_id: my.me.id });
            })
        }).subscribe();
    }

    services$ = this.counters$.combineLatest(
        Model.Center.CacheService.RxListView,
        (counters, allServices) => {
            const servicable = {}
            counters.forEach(c => {
                c.services.forEach(id => servicable[id] = true)
                c.vservices = c.vservices || []
                c.vservices.forEach(id => servicable[id] = true)
            })
            const services = allServices.filter(s => servicable[s.id]);
            return services.sort((a, b) => a.name > b.name ? 1 : -1);
        });
}

function AddToSet<T>(arr: T[] = [], a: T, checker: (old: T) => boolean) {
    if (!a) {
        return arr;
    }
    const i = arr.findIndex(checker);
    const v: T[] = [].concat(arr);
    if (i < 0) {
        v.push(a);
    } else {
        v[i] = a;
    }
    return v;
}