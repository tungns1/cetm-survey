import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {
    AuthService,
    CacheService, AppSocketGenerator
} from './shared';

import {
    ICounter, ITicket,
    TicketState
} from '../shared';

import { IStatMap } from '../model';

const SOCKET_LINK = "/room/counter/join";
const SOCKET_PARAMS = ['branch_code', 'counter_code']

@Injectable()
export class WorkspaceService {
    constructor(
        private authService: AuthService,
        private appSocketGenerator: AppSocketGenerator
    ) { }

    private socket = this.appSocketGenerator.make(SOCKET_LINK);

    get Socket() {
        return this.socket;
    }

    onInit(branch_code: string, counter_code: string) {
        this.socket.Connect({ branch_code, counter_code });
        this.socket.disableCheckAlive();
        this.setUser();
    }

    onDestroy() {
        this.socket.Terminate();
    }

    currentCounter$ = this.socket.RxEvent<ICounter>("/counter");
    counters$ = this.socket.RxEvent<ICounter[]>("/counters");


    stat$ = this.socket.RxEvent<IStatMap>("/stat").share();

    private setUser() {
        this.socket.Connected$.switchMap(() => {
            return this.authService.RxMySetting.switchMap(my => {
                return this.socket.Send("/set_user", { user_id: my.me.id });
            })
        }).subscribe();
    }

    services$ = this.counters$.combineLatest(
        CacheService.RxListView,
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