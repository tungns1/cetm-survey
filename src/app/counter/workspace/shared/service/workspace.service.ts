import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {
    AuthService,
    RuntimeEnvironment,
    CacheService
} from './shared';

import {
    ICounter, ITicket,
    TicketState
} from '../shared';

import { IStatMap } from '../model';

const SOCKET_LINK = "/room/counter/join";
import { WorkspaceSocket } from './workspace.socket';

@Injectable()
export class WorkspaceService {
    constructor(
        private authService: AuthService,
        private socket: WorkspaceSocket,
        private env: RuntimeEnvironment
    ) { }

    get Socket() {
        return this.socket;
    }

    enable() {
        this.socket.onInit();
        this.setUser();
    }

    disable() {
        this.socket.onDestroy();
    }

    currentCounter$ = this.socket.RxEvent<ICounter>("/counter");
    counters$ = this.socket.RxEvent<ICounter[]>("/counters");


    stat$ = this.socket.RxEvent<IStatMap>("/stat").share();

    private setUser() {
        this.socket.Connected$.switchMap(() => {
            return this.env.Auth.Data$.switchMap(data => {
                return this.socket.Send("/set_user", { user_id: data.me.id });
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